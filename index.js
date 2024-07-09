

import { deepMerge , isString } from "./helpers.js";

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
    console.log(title, style , ...args)
}

function stLog( ...args) {
    stLog.default(...args)
}


stLog._config = defaultsConfig

// extends
stLog.extends = function (...configs) {
    stLog._config = deepMerge(stLog._config, ...configs)
    Object.keys(stLog._config).forEach(methodName => {
        stLog[methodName] = function ( message , ...userArgs) {
            const config = Object.assign( {} , stLog._config[methodName] || stLog._config.default || defaultMethodConfig)
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

stLog.extends()


export default stLog
