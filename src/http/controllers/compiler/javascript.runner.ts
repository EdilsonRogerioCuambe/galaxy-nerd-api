/* eslint-disable n/no-callback-literal */
import { spawn } from 'child_process'
import { Runner } from './runner'

export class JavaScriptRunner extends Runner {
  defaultFile: string

  constructor() {
    super()
    this.defaultFile = 'Hello.js'
  }

  run(
    file: string,
    directory: string,
    filename: string,
    extension: string,
    callback: (code: string, compileResult: string, data: string) => void,
  ): void {
    if (extension.toLowerCase() !== '.js') {
      console.log(`${file} is not a javascript file.`)
      return
    }
    this.execute(
      file,
      directory,
      (compileResult: string, executionResult: string) => {
        callback('0', compileResult, executionResult)
      },
    )
  }

  execute(
    file: string,
    directory: string,
    callback: (compileResult: string, data: string) => void,
  ): void {
    const options = { cwd: directory }
    const argsRun = [file]
    console.log(`options: ${options}`)
    console.log(`argsRun: ${argsRun}`)

    const executor = spawn('node', argsRun, options)

    let compileResult = ''

    executor.stdout.on('data', (output) => {
      console.log(String(output))
      compileResult += output
    })

    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`)
      compileResult += output
    })

    executor.on('close', (output) => {
      this.log(`stdout: ${output}`)
      callback(compileResult, String(output))
    })
  }

  log(message: string): void {
    console.log(message)
  }
}
