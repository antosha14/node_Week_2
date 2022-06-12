import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { unlink } from 'fs'
import { resolve } from 'path'

export const removeFile = function (input) {
    try {
        var fileToRemovePath = resolve(currentDirectory, input.slice(3))
    }
    catch {
        return operationError()
    }
    unlink(fileToRemovePath, (err) => {
        if (err) {
            return operationError()
        }
    })
}