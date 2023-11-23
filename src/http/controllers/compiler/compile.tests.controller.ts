/* eslint-disable no-new-func */
// disable eslint implicit any
/* eslint-disable @typescript-eslint/no-implied-eval */
import { FastifyRequest, FastifyReply } from 'fastify'
import Docker from 'dockerode'
import { z } from 'zod'
import assert from 'assert'

const docker = new Docker()

export async function compileTestsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const schema = z.object({
      code: z.string(), // exemplo: import assert from 'assert' export const jumpGameHandler = (fn: any) => {   try {     const tests = [       [2, 3, 1, 1, 4],       [3, 2, 1, 0, 4],       [2, 0, 0],       [2, 5, 0, 0],     ]     const answers = [true, false, true, true]     for (let i = 0; i < tests.length; i++) {       const result = fn(tests[i])       assert.equal(result, answers[i])     }     return true   } catch (error: any) {     console.log('Error from jumpGameHandler: ', error)     throw new Error(error)   } }
      cb: z.string(), // exemplo: function twoSum(nums, target) { let map = new Map(); for (let i = 0; i < nums.length; i++) { let complement = target - nums[i]; if (map.has(complement)) { return [map.get(complement), i]; } map.set(nums[i], i); } return []; } let nums = [2,7,11,15]; let target = 9; let indices = twoSum(nums, target); console.log(indices);
      examples: z.array(
        z.object({ inputText: z.string(), outputText: z.string() }), // exemplo: [{ inputText: 'nums = [2,3,1,1,4]', outputText: 'true' }, { inputText: 'nums = [3,2,1,0,4]', outputText: 'false' }]
      ),
      timeLimit: z.number().default(1000),
      memoryLimit: z.number().default(100000000),
      language: z.string().default('javascript'),
    })

    const { code, cb, examples, timeLimit, memoryLimit, language } =
      schema.parse(request.body)

    const compilerImage: Record<string, string> = {
      javascript: 'node',
      python: 'python',
      c: 'gcc',
      'c++': 'gcc',
      java: 'openjdk',
    }

    if (!compilerImage[language]) {
      throw new Error(`Unsupported language: ${language}`)
    }

    let cmd

    switch (language) {
      case 'python':
        cmd = ['sh', '-c', `echo "${code}" > main.py && python main.py`]
        break
      case 'javascript':
        cmd = ['sh', '-c', `echo "${code}" > main.js && node main.js`]
        break
      case 'c':
        cmd = [
          'sh',
          '-c',
          `echo "${code}" > main.c && gcc main.c -o main && ./main`,
        ]
        break
      case 'c++':
        cmd = [
          'sh',
          '-c',
          `echo "${code}" > main.cpp && g++ main.cpp -o main && ./main`,
        ]
        break
      case 'java':
        cmd = [
          'sh',
          '-c',
          `echo "${code}" > Main.java && javac Main.java && java Main`,
        ]
        break
      default:
        throw new Error(`Unsupported language: ${language}`)
    }

    const container = await docker.createContainer({
      Image: compilerImage[language],
      Cmd: cmd,
      HostConfig: {
        CpuShares: 1024,
        Memory: memoryLimit * 1024 * 1024,
        MemorySwap: memoryLimit * 1024 * 1024,
        MemoryReservation: memoryLimit * 1024 * 1024,
        NanoCpus: timeLimit * 1000000000,
      },
    })

    await container.start()

    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    })

    const output: string[] = []

    logs.on('data', (chunk) => {
      output.push(chunk.toString())
    })

    await new Promise((resolve) => {
      logs.on('end', resolve)
    })

    await container.remove()

    const result = output.join('')
    const resultLines = result.split('\n')
    const lastLine = resultLines[resultLines.length - 2]
    const trimmedLastLine = lastLine.trim()

    const cbFunction = new Function(cb)

    // const cbFunction = new Function(cb)
    // console.log(cbFunction)

    // const cbResult = cbFunction()
    // console.log(cbResult)

    const tests = examples.map((example) => {
      const { inputText, outputText } = example
      const inputFunction = new Function(inputText)
      const input = inputFunction()
      const outputFunction = new Function(outputText)
      const output = outputFunction()
      return { input, output }
    })

    const answers = tests.map((test) => test.output)

    for (let i = 0; i < tests.length; i++) {
      const result = cbFunction(tests[i].input)
      assert.equal(result, answers[i])
      console.log('assertion passed')
    }

    reply.code(200).send({
      message: 'Code compiled successfully',
      result: trimmedLastLine,
      output,
    })
  } catch (error) {
    console.log(error)
    reply.code(400).send({ message: 'Error compiling code', error })
  }
}
