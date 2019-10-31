module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    function minC(value, msg) {
        if (value.length < 1 ) throw msg
    }

    function maxC(value, msg) {
        if (value.length > 2 ) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return 
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function notEqualsOrError(valueA, ValueB, msg) {
        if (valueA == ValueB) throw msg 
    }

    return { existsOrError, notExistsOrError, equalsOrError, notEqualsOrError }
}
