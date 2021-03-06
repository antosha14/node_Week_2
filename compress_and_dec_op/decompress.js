import { readFile, createWriteStream, createReadStream, open, read } from 'fs'
import { operationError, pathCheck } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve, dirname, sep } from 'path'
import { createBrotliCompress, createBrotliDecompress } from 'zlib'

export const decompressFile = function (input) {
    const paths = input.split(" ").slice(1)
    try {
        var fileToDecompress = resolve(currentDirectory, paths[0])
        var decompressedFilePath = resolve(currentDirectory, paths[1]) + sep + 'decompressed.txt'
    }
    catch {
        operationError()
        return viewCurrentDirectory()
    }
    const brotli = createBrotliDecompress()

    const readStream = createReadStream(fileToDecompress)
    const writeStream = createWriteStream(decompressedFilePath)
    readStream.pipe(brotli).pipe(writeStream)
    readStream.on('error', (err) => {
        console.log('Ошибка прочтения файла')
        return viewCurrentDirectory()
    })
    writeStream.on('error', (err) => {
        console.log('Ошибка места назначения архива')
        return viewCurrentDirectory()
    })
    return viewCurrentDirectory()
}