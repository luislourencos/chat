const { VoidError, FormatError } = require('../errors')

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/

const String = {
    isString(string) {
        return typeof string === 'string'
    }
}

String.validate = function (string) {
    if (!this.isString(string)) throw new TypeError(`${string} is not a string`)
}.bind(String)

String.isVoid = function (string) {
    this.validate(string)
    return !string.trim().length

}.bind(String)

String.notVoid = function (string) {
    if (this.isVoid(string)) throw new VoidError(`string is empty or blank`)
}.bind(String)

String.validatePassword = function (string) {
    if (!PASSWORD_REGEX.test(string)) throw new FormatError(`Need to have letter, numbers and at least 5 caracters!`)
}.bind(String)


module.exports = String