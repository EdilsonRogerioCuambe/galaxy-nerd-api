/* eslint-disable n/no-callback-literal */
import { spawn } from 'child_process'
import { Runner } from './runner'

export class JavaRunner extends Runner {
  defaultFile: string

  constructor() {
    super()
    this.defaultFile = 'Hello.java'
  }

  run(
    file: string,
    directory: string,
    filename: string,
    extension: string,
    callback: (code: string, data: string) => void,
  ): void {
    if (extension.toLowerCase() !== '.java') {
      console.log(`${file} is not a java file.`)
      return
    }
    this.compile(file, directory, filename, callback)
  }

  compile(
    file: string,
    directory: string,
    filename: string,
    callback: (code: string, data: string) => void,
  ): void {
    const options = { cwd: directory }
    const argsCompile = [file]
    console.log(`argsCompile:${argsCompile}`)

    const compiler = spawn('javac', argsCompile)
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`)
      callback('1', String(data))
    })
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(filename, options, callback)
      }
    })
  }

  execute(
    filename: string,
    options: { cwd: string },
    callback: (code: string, data: string) => void,
  ): void {
    const argsRun = [filename]

    const executor = spawn('java', argsRun, options)
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
