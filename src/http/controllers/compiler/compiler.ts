import { FastifyRequest, FastifyReply } from 'fastify'
import Docker from 'dockerode'
import { z } from 'zod'

const docker = new Docker()

export async function compilerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const schema = z.object({
      testCases: z
        .array(
          z.object({
            input: z.string(),
            output: z.string(),
          }),
        )
        .default([]),
      sourceCode: z.string(),
      language: z.string(),
      timeLimit: z.number(),
      memoryLimit: z.number(),
    })

    const { sourceCode, language, timeLimit, memoryLimit } = schema.parse(
      request.body,
    )

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
        cmd = ['sh', '-c', `echo "${sourceCode}" > main.py && python main.py`]
        break
      case 'javascript':
        cmd = ['sh', '-c', `echo "${sourceCode}" > main.js && node main.js`]
        break
      case 'c':
        cmd = [
          'sh',
          '-c',
          `echo "${sourceCode}" > main.c && gcc main.c -o main && ./main`,
        ]
        break
      case 'c++':
        cmd = [
          'sh',
          '-c',
          `echo "${sourceCode}" > main.cpp && g++ main.cpp -o main && ./main`,
        ]
        break
      case 'java':
        cmd = [
          'sh',
          '-c',
          `echo "${sourceCode}" > Main.java && javac Main.java && java Main`,
        ]
        break
      default:
        break
    }

    if (!compilerImage[language]) {
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

    const output: string[] = []

    container.attach(
      { stream: true, stdout: true, stderr: true },
      (err, stream) => {
        if (err) {
          throw err
        }
        if (stream) {
          stream.on('data', (chunk) => {
            output.push(chunk.toString())
            console.log(chunk.toString())
          })
          stream.on('error', (error) => {
            console.log(error)
          })
        }
      },
    )

    await container.wait()

    const { StatusCode } = await container.wait()

    await container.remove()

    if (StatusCode === 137) {
      reply.code(400).send({
        message: 'Memory limit exceeded',
        StatusCode,
        output,
      })
    } else if (StatusCode === 143) {
      reply.code(400).send({
        message: 'Time limit exceeded',
        StatusCode,
        output,
      })
    } else if (StatusCode !== 0) {
      reply.code(400).send({ message: 'Runtime error', StatusCode, output })
    } else {
      reply.code(200).send({ message: 'Accepted', StatusCode, output })
    }
  } catch (error) {
    console.log(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
