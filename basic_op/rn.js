import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { rename } from 'fs'
import { resolve } from 'path'

export const renameFile = function (input) {
    const pathToFile = resolve(currentDirectory, input.split(" ")[1])
    const pathToRenamedFile = resolve(currentDirectory, input.split(" ")[2])
    rename(pathToFile, pathToRenamedFile, (err) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        return viewCurrentDirectory()
    })
}