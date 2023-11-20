/* eslint-disable n/no-callback-literal */
import fs from 'fs'
import path from 'path'

const getDirName = path.dirname

const getFile = (lang: string, callback: (data: string) => void): void => {
  let file = ''
  const language = lang.toLowerCase()
  if (language === 'java') {
    file = path.join(__dirname, '../../../templates', 'Hello.java')
  } else if (language === 'c') {
    file = path.join(__dirname, '../../../templates', 'Hello.c')
  } else if (language === 'c++') {
    file = path.join(__dirname, '../../../templates', 'Hello.cpp')
  } else if (language === 'javascript') {
    file = path.join(__dirname, '../../../templates', 'Hello.js')
  } else if (language === 'python') {
    file = path.join(__dirname, '../../../templates', 'Hello.py')
  } else {
    callback('') // Callback with an empty string when language is not recognized
    return // Return early
  }

  console.log(`getTemplate:${file}`)
  fs.readFile(file, (err, data) => {
    if (err) {
      throw err
    }
    console.log(data.toString())
    callback(data.toString())
  })
}

const saveFile = (
  file: string,
  code: string,
  callback: (err?: NodeJS.ErrnoException | null) => void,
): void => {
  // create parent directories if they don't exist.
  fs.mkdir(getDirName(file), { recursive: true }, (err) => {
    if (err) {
      return callback(err)
    }

    fs.writeFile(file, code, (err2) => {
      if (err2) {
        throw err2
      }

      callback(null) // Callback without an error
    })
  })
}

export { getFile, saveFile }
