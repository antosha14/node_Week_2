import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve } from 'path'
import { createReadStream } from 'fs'

export const fileReader = function (inputedFilePath) {
    try {
        var fileToRead = resolve(currentDirectory, inputedFilePath.slice(4))
        var readStream = createReadStream(fileToRead)
    }
    catch {
        return operationError()
    }
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


