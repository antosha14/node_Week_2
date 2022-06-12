export const pathParce = function (numberOfInst, input) {
    let string = 'rm "iwqjeioqwj qwijeqwio jjj" "wqewqeqweqw qweqweqwe qwewqw"'
    let sepIds = []
    let allSep = [...string.matchAll("\"")].forEach((separator) => {
        sepIds.push(separator.index)
    })
    let path1 = ""
    let path2 = ""
}

pathParce()