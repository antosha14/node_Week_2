import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { writeFile } from 'fs'
import { sep } from 'path'

export const addEmptyFile = function (input) {
    try {
        var fileToCreatePath = currentDirectory + sep + input.slice(4)
    } catch {
        return operationError()
    }
    // Если файл уже есть то ничего не произойдет
    writeFile(fileToCreatePath, "", { flag: 'wx' }, (err) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        return viewCurrentDirectory()
    })
}