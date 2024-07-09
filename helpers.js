
export const toString = Object.prototype.toString
export const isObject = (val) => {
    return typeof val !== 'undefined' && typeof val === "object"
}
export function isString(val) {
    return toString.call(val) == '[object String]'
}
export const isPlainObject = (val) => {
    return toString.call(val) === '[object Object]'
}
export function deepMerge(...args) {
    const ret = {}
    args.forEach(arg => {
        if (isPlainObject(arg)) {
            Object.keys(arg).forEach((key) => {
                if (!isPlainObject(arg[key])) {
                    ret[key] = arg[key]
                } else {
                    ret[key] = deepMerge(ret[key], arg[key])
                }
            })
        }
    })
    return ret
}
