import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve } from 'path'
import { createReadStream } from 'fs'

export const fileReader = function (inputedFilePath) {
    const fileToRead = resolve(currentDirectory, inputedFilePath.slice(4))
    const readStream = createReadStream(fileToRead)
    readStream.pipe(process.stdout)
    readStream.on('error', (err) => {
        operationError()
        return viewCurrentDirectory()
    })
    readStream.on('data', (err) => {
        console.log('')
        return viewCurrentDirectory()
    })
}


