/* eslint-disable n/no-callback-literal */
import { spawn } from 'child_process'
import { join } from 'path'
import { Runner } from './runner'

export class CRunner extends Runner {
  defaultFile: string

  constructor() {
    super()
    this.defaultFile = 'Hello.c'
  }

  run(
    file: string,
    directory: string,
    filename: string,
    extension: string,
    callback: (code: string, data: string) => void,
  ): void {
    if (extension.toLowerCase() !== '.c') {
      console.log(`${file} is not a c file.`)
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
    const argsCompile = [file, '-o', join(directory, `${filename}.out`)]
    console.log(`argsCompile:${argsCompile}`)

    const compiler = spawn('gcc', argsCompile)
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`)
      callback('1', String(data))
    })
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, callback)
      }
    })
  }

  execute(
    directory: string,
    filename: string,
    options: { cwd: string },
    callback: (code: string, data: string) => void,
  ): void {
    const cmdRun = join(directory, `${filename}.out`)

    const executor = spawn(cmdRun, [], options)
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
