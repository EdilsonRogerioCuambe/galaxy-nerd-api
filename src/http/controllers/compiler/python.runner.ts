/* eslint-disable n/no-callback-literal */
import { spawn } from 'child_process'
import { Runner } from './runner'

export class PythonRunner extends Runner {
  defaultFile: string

  constructor() {
    super()
    this.defaultFile = 'Hello.py'
  }

  run(
    file: string,
    directory: string,
    filename: string,
    extension: string,
    callback: (code: string, data: string) => void,
  ): void {
    if (extension.toLowerCase() !== '.py') {
      console.log(`${file} is not a python file.`)
      return
    }
    this.execute(file, directory, callback)
  }

  execute(
    file: string,
    directory: string,
    callback: (code: string, data: string) => void,
  ): void {
    const options = { cwd: directory }
    const argsRun = [file]
    console.log(`options: ${options}`)
    console.log(`argsRun: ${argsRun}`)

    const executor = spawn('python', argsRun, options)
    executor.stdout.on('data', (output) => {
      console.log(String(output))
      callback('0', String(output))
    })
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`)
      callback('2', String(output))
    })
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`)
    })
  }

  log(message: string): void {
    console.log(message)
  }
}
