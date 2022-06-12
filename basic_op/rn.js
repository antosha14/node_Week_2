import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { rename } from 'fs'
import { resolve } from 'path'
import { pathParce } from '../newPathParce.js'

export const renameFile = function (input) {
    try {
        var pathToFile = resolve(currentDirectory, pathParce(input)[0])
        var pathToRenamedFile = resolve(currentDirectory, pathParce(input)[1])
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