import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { rename } from 'fs'
import { resolve } from 'path'

export const renameFile = function (input) {
    try {
        var pathToFile = resolve(currentDirectory, input.split(" ")[1])
        var pathToRenamedFile = resolve(currentDirectory, input.split(" ")[2])
    } catch {
        return operationError()
    }
    rename(pathToFile, pathToRenamedFile, (err) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        return viewCurrentDirectory()
    })
}