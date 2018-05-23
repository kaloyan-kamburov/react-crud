export function notEmpty(value) {
    return value.length > 0;
}

export function minLength(length) {
    let f = value => {
        return value.length >= length
    }
    return f;
}

export function positiveNumber(value) {
    return value > 0;
}