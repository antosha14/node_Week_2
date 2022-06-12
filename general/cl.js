import path, { resolve, dirname, join } from 'path'
import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'


// import.meta идет от самого ДЖэса, а функция возвращает абсолютный путь к файлу, который вызывает скрипт
export const __fileName = fileURLToPath(import.meta.url)
// Далее мы их этого абсолютного пути забираем абсолютный путь только к папке
export const __dirname = path.dirname(__fileName)


// А этим методом мы соединяем стринговые пути с помощью специфического для платформы сепаратора
const neededFile = join(__dirname, 'files', "filename.txt")
console.log(neededFile)
