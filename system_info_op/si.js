import { cp } from 'fs';
import { homedir, EOL, arch, userInfo, cpus } from 'os'
import { viewCurrentDirectory } from "../navigation/navigation.js";

const systemInfo = userInfo()

export const getEol = function () {
    const message = JSON.stringify(EOL)
    console.log(message)
    return viewCurrentDirectory()
}

// Overall amount + модель и clock rate in GHz аок each of them
export const getCpuInfo = function () {
    let cpuInfo = cpus()
    console.log(`You have ${cpuInfo.length} cores`)
    cpuInfo.forEach((coreInfo) => {
        console.log(coreInfo.model)
    })
    return viewCurrentDirectory()
}

export const getCpuArch = function () {
    console.log(arch())
    return viewCurrentDirectory()
}

export const getHomeDir = function () {
    console.log(systemInfo.homedir)
    return viewCurrentDirectory()
}

export const getSystUsername = function () {
    console.log(systemInfo.username)
    return viewCurrentDirectory()
}