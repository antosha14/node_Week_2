export const pathParce = function (input) {
    let string = input
    let sepIds = []
    try {
        var allSep = [...string.matchAll("\"")].forEach((separator) => {
            sepIds.push(separator.index)
        })
    } catch {
        return
    }
    try {
        var path1 = string.slice(sepIds[0] + 1, sepIds[1])
    }
    catch {
        return
    }
    try {
        var path2 = string.slice(sepIds[2] + 1, sepIds[3])
    } catch {
        var path2 = false
    }
    let pathArray = [path1, path2]
    return pathArray
}
