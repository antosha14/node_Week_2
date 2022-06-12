import { readFile } from 'fs'
import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { createHash } from 'crypto'
import { resolve, dirname } from 'path'
import { pathParce } from '../newPathParce.js'

export const calculateHash = function (inputedFilePath) {
    try {
        var filePath = resolve(currentDirectory, pathParce(inputedFilePath)[0])
    } catch {
        return operationError()
    }
    const fileContent = readFile(filePath, (err) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        const hash = createHash('sha256').update(filePath).digest("hex")
        console.log(hash)
        return viewCurrentDirectory()
    })
}