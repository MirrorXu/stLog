

import {deepMerge, isFunction, isString} from "./helpers.js";

const icon = ">>>"
const defaultMethodConfig = {
    icon,
    title: "",
    style: "color: #cccccc;font-weight:bold;",
}
const defaultsConfig = {
    default:defaultMethodConfig,
    info: {
        icon,
        title: "",
        style: "color: #03AED2;font-weight:bold;",
    },
    warn: {
        icon,
        title: "",
        style: "color:#FFA62F;font-weight:bold;"
    },
    success: {
        icon,
        title: "",
        style: "color:#41B06E;font-weight:bold;"
    },
    error: {
        icon,
        title: "",
        style: "color:#ff0000;font-weight:bold;"
    }
}

function logWithConfig(config = defaultMethodConfig, ...args) {
    let argsArr;
    let {icon, title, style} = config
    title = icon ? `${icon} ${title}` : title
    title = `%c ${title}`
    if(console && console.log && isFunction(console.log)){
        console.log(title, style , ...args)
    }else{
        throw new Error('抱歉，运行时环境不支持console.log')
    }

}

function log( ...args) {
    log.default(...args)
}


log._config = defaultsConfig

// extends
log.extends = function (...configs) {
    log._config = deepMerge(log._config, ...configs)
    Object.keys(log._config).forEach(methodName => {
        log[methodName] = function ( message , ...userArgs) {
            const config = Object.assign( {} , log._config[methodName] || log._config.default || defaultMethodConfig)
            let args;
            if(isString(message)) {
                config.title = message;
                args = userArgs
            }else{
                args = [message , ...userArgs]
            }
            logWithConfig(config, ...args)
        }
    })
}

log.extends()


export default log
