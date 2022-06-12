import { readdir, access } from 'fs'
import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'

export const listDirectoryContent = function () {
    const files = readdir(currentDirectory, (err, files) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        files.forEach((file) => {
            console.log(file)
        })
        return viewCurrentDirectory()
    })
}