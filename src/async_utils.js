export const async_call = async (cb) => {
    return cb();
}

export const async_timeout = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}