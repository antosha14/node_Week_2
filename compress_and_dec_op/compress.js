import { readFile, createWriteStream, createReadStream, open, read } from 'fs'
import { operationError, pathCheck } from '../main.js'
import { currentDirectory, viewCurrentDirectory } from '../navigation/navigation.js'
import { resolve, dirname, sep } from 'path'
import { createBrotliCompress } from 'zlib'
import { pathParce } from '../newPathParce.js'

export const compressFile = function (input) {
    const paths = pathParce(input)
    try {
        var fileToCompressPath = resolve(currentDirectory, paths[0])
        var compressedFilePath = resolve(currentDirectory, paths[1]) + sep + 'archive.br'
    }
    catch {
        operationError()
        return viewCurrentDirectory()
    }
    const brotli = createBrotliCompress()
    brotli.on("error", (err) => {
        console.log('Ошибка в бротли Алгоритме')
        return viewCurrentDirectory()
    })
    const readStream = createReadStream(fileToCompressPath)
    const writeStream = createWriteStream(compressedFilePath)
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



// На стриме он датаб стрим для саписи .write (data.tostring())