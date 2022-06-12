import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve } from 'path'
import { createReadStream } from 'fs'
import { pathParce } from '../newPathParce.js'

export const fileReader = function (inputedFilePath) {
    try {
        var fileToRead = resolve(currentDirectory, pathParce(inputedFilePath)[0])
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


