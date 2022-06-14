function objectsHaveSameKeys(requestKeys, obj) {
    let obj2 = {}
    let empty = false
    requestKeys.map((i) => {
        if (obj.hasOwnProperty(i)) {
            obj2[i] = obj[i]
        } else {
            empty = true
        }
    })
    return empty ? false : obj2

}

module.exports = {
    objectsHaveSameKeys
}