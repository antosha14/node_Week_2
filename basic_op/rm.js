import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { unlink } from 'fs'
import { resolve } from 'path'
import { pathParce } from '../newPathParce.js'

export const removeFile = function (input) {
    try {
        var fileToRemovePath = resolve(currentDirectory, pathParce(input)[0])
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