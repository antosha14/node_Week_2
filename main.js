import * as readline from "readline"
import { stdin as input, stdout as output } from 'process';
import { viewCurrentDirectory, changeCurrentDirecrory, moveOneFolderUp } from "./navigation/navigation.js";
import { getEol, getCpuArch, getCpuInfo, getHomeDir, getSystUsername } from "./system_info_op/si.js";
import { listDirectoryContent } from "./basic_op/ls.js";
import { calculateHash } from "./hash/hash.js";
import { compressFile } from "./compress_and_dec_op/compress.js";
import { access } from "fs";
import { fileReader } from "./basic_op/cat.js";
import { addEmptyFile } from "./basic_op/add.js";
import { renameFile } from "./basic_op/rn.js";
import { fileCopyCreater, moveFile } from "./basic_op/cp.js";
import { removeFile } from "./basic_op/rm.js";


export const clArgumentsArray = process.argv.slice(2)
export const rl = readline.createInterface({ input, output })
export let userName = ''
export let availableCommands = ['.exit', 'cd ', 'os --EOL', 'os --cpus', 'os --homedir', 'os --username', 'os --architecture', 'up'
    , 'ls', 'hash ', 'compress ', 'cat ', 'add ', 'rn ', 'cp ', 'rm ', 'mv ']

export const greetings = function () {
    userName = clArgumentsArray[0].slice(clArgumentsArray[0].indexOf("=") + 1)
    console.log(`Welcome to the File Manager, ${userName}!`)
}

export const showGoodByeMessage = function () {
    console.log(`Thank you for using File Manager, ${userName}!`)
}

export const commandValidityCheck = function (inputedComand) {
    let checkResult = availableCommands.reduce((accum, comand) => {
        if (accum) {
            return true
        }
        if (inputedComand.startsWith(comand)) {
            return true
        }
    }, false)
    return checkResult
}

export const operationError = function () {
    console.log('Operation failed')
}

export const pathCheck = function (pathA, pathB = "") {
    access(pathA, (err) => {
        if (err) {
            operationError()
            return false
        }
    })
    if (pathB != "") {
        access(pathB, (err) => {
            if (err) {
                operationError()
                return false
            }
        })
    }
    return true
}


const appLaunch = async function () {
    greetings()
    viewCurrentDirectory()
    rl.on('line', (input) => {
        // Проверка команды на валидность
        if (!commandValidityCheck(input)) {
            console.log('Invalid input')
            return viewCurrentDirectory()
        }

        if (input === '.exit') {
            return rl.close()
        }
        else if (input.startsWith('cd ')) {
            return changeCurrentDirecrory(input)
        }
        else if (input === 'up') {
            return moveOneFolderUp()
        }
        else if (input === 'os --EOL') {
            return getEol()
        }
        else if (input === 'os --cpus') {
            return getCpuInfo()
        }
        else if (input === 'os --homedir') {
            return getHomeDir()
        }
        else if (input === 'os --username') {
            return getSystUsername()
        }
        else if (input === 'os --architecture') {
            return getCpuArch()
        }
        else if (input === 'ls') {
            return listDirectoryContent()
        }
        else if (input.startsWith('hash ')) {
            return calculateHash(input)
        }
        else if (input.startsWith('compress ')) {
            return compressFile(input)
        }
        else if (input.startsWith('cat ')) {
            return fileReader(input)
        }
        else if (input.startsWith('add ')) {
            return addEmptyFile(input)
        }
        else if (input.startsWith('rn ')) {
            return renameFile(input)
        }
        else if (input.startsWith('cp ')) {
            fileCopyCreater(input)
            return viewCurrentDirectory()
        }
        else if (input.startsWith('rm ')) {
            removeFile(input)
            return viewCurrentDirectory()
        }
        else if (input.startsWith('mv ')) {
            moveFile(input)
        }
    })
    rl.on('close', showGoodByeMessage)
}

appLaunch()