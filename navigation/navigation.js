import { homedir } from 'os'
import { access } from 'fs'
import { operationError } from '../main.js'
import { resolve, dirname } from 'path'
import { pathParce } from '../newPathParce.js'

export let currentDirectory = homedir

    // Меняем текущую дирректорию процесса нода
    (function () {
        console.log(currentDirectory)
        try {
            process.chdir(currentDirectory)
        } catch {
            operationError()
        }
    })


export let viewCurrentDirectory = function () {
    console.log(`You are currently in ${currentDirectory}`)
}

// Не работают относительные ссылки
export let changeCurrentDirecrory = function (input) {
    try {
        var inputDirectory = resolve(currentDirectory, pathParce(input)[0])
    }
    catch {
        return operationError()
    }

    access(inputDirectory, (err) => {
        if (err) {
            operationError()
            return viewCurrentDirectory()
        }
        if (inputDirectory.length <= 2) {
            console.log("You can't go higher than root")
            return viewCurrentDirectory()
        }
        currentDirectory = inputDirectory
        return viewCurrentDirectory()
    })
}


export let moveOneFolderUp = function (input) {
    if (true) { //currentDirectory != homedir используем если нужно не иметь возможности спускаться ниже старта 
        currentDirectory = dirname(currentDirectory)
        return viewCurrentDirectory()
    } else {
        console.log("You can't go up from home directory!")
        return viewCurrentDirectory()
    }
}

