import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { unlink } from 'fs'
import { resolve } from 'path'

export const removeFile = function (input) {
    const fileToRemovePath = resolve(currentDirectory, input.slice(3))
    unlink(fileToRemovePath, (err) => {
        if (err) {
            return operationError()
        }
    })
}