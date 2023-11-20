import { CppRunner } from './cpp.runner'
import { CRunner } from './c.runner'
import { JavaScriptRunner } from './javascript.runner'
import { PythonRunner } from './python.runner'
import { JavaRunner } from './java.runner'
import { join, parse } from 'path'
import { saveFile } from './file.api'
import { FastifyReply } from 'fastify'

class Factory {
  createRunner(
    lang: string,
  ):
    | CRunner
    | CppRunner
    | JavaRunner
    | JavaScriptRunner
    | PythonRunner
    | undefined {
    let runner

    if (lang === 'c') {
      runner = new CRunner()
    } else if (lang === 'c++') {
      runner = new CppRunner()
    } else if (lang === 'java') {
      runner = new JavaRunner()
    } else if (lang === 'javascript') {
      runner = new JavaScriptRunner()
    } else if (lang === 'python') {
      runner = new PythonRunner()
    }

    return runner
  }
}

export function run(lang: string, code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const factory = new Factory()
    const runner = factory.createRunner(lang.toLowerCase())

    if (runner) {
      const directory = join(__dirname, 'temp')
      const file = join(directory, runner.defaultFile)
      const filename = parse(file).name
      const extension = parse(file).ext

      saveFile(file, code, () => {
        runner.run(
          file,
          directory,
          filename,
          extension,
          (status: string, message: string) => {
            if (status === '0') {
              resolve(message)
            } else {
              // Parse the error message to extract the line number and error
              const errorLine = message.split(',')[1].split(' ')[2]
              const errorMessage = message.split(':')[1].trim()
              reject(new Error(`Linha ${errorLine}: ${errorMessage}`))
            }
          },
        )
      })
    } else {
      reject(new Error('Unsupported language'))
    }
  })
}
