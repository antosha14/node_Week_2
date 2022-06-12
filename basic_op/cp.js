import { operationError } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import path, { resolve, dirname, basename, extname, sep } from 'path'
import { readFile, createWriteStream, createReadStream, open, access, unlink } from 'fs'
import { removeFile } from './rm.js'

export const fileCopyCreater = function (inputedFilePath) {
    const links = inputedFilePath.split(' ').slice(1)
    const fileToCopyPath = resolve(currentDirectory, links[0])
    const copiedFilePath = resolve(currentDirectory, links[1]) + sep + basename(fileToCopyPath)
    const reader = createReadStream(fileToCopyPath)
    const writer = createWriteStream(copiedFilePath)
    reader.on('error', (err) => {
        return operationError()
    })
    reader.pipe(writer)
    writer.on('error', (err) => {
        if (err) { return }
        return viewCurrentDirectory()
    })
}

export const moveFile = function (inputedFilePath) {
    try {
        var links_m = inputedFilePath.split(' ').slice(1)
        var fileToCopyPath_m = resolve(currentDirectory, links_m[0])
        var copiedFilePath_m = resolve(currentDirectory, links_m[1]) + sep + basename(fileToCopyPath_m)
    } catch {
        return operationError()
    }
    const reader_m = createReadStream(fileToCopyPath_m)
    const writer_m = createWriteStream(copiedFilePath_m)
    reader_m.on('error', (err) => {
        operationError()
        return viewCurrentDirectory()
    })
    reader_m.on('close', (err) => {
        unlink(fileToCopyPath_m, (err) => {
            if (err) { return }
            return viewCurrentDirectory()
        })
    })
    writer_m.on('error', (err) => {
        if (err) { return }
        return viewCurrentDirectory()
    })
    reader_m.pipe(writer_m)
}