import { readFile, createWriteStream, createReadStream, open } from 'fs'
import { operationError, pathCheck } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve, dirname } from 'path'
import { createBrotliCompress } from 'zlib'

export const compressFile = function (input) {
    const paths = input.split(" ").slice(1)
    const fileToCompressPath = resolve(currentDirectory, paths[0])
    const fileToDecompressPath = resolve(currentDirectory, paths[1])
    const folderOfFileToDecompressPath = dirname(fileToDecompressPath)
    const fileToCompress = open(fileToCompressPath, (err) => {
        if (err) return operationError()
    })

    // Создать файл для архивирования 
    const writeStream = createWriteStream(fileToDecompressPath)
    const brotli = createBrotliCompress()
    const dataStream = readStream.pipe(brotli).pipe(writeStream)
    return viewCurrentDirectory()
}



// На стриме он датаб стрим для саписи .write (data.tostring())