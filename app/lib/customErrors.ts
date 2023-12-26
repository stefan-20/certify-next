
class PasswordMismatchError extends Error {
    constructor(){
        super("Passwords dont match.")
        Object.setPrototypeOf(this, PasswordMismatchError.prototype);
    }
}
class UserExistsError extends Error {
    constructor(){
        super("A user with that email already exists.")
        Object.setPrototypeOf(this, UserExistsError.prototype);
    }
}
class UserDoesntExistError extends Error {
    constructor(){
        super("No user with that email exists.")
        Object.setPrototypeOf(this, UserDoesntExistError.prototype);
    }
}

export {PasswordMismatchError, UserExistsError, UserDoesntExistError}