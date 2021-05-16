import { makeAutoObservable } from "mobx";

class RegisterStore {
    firstName = ''
    lastName = ''
    email = ''
    password = ''
    confirmPassword = ''
    address = ''
    country = ''
    role = 'customer'

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
};

export const registerStore = new RegisterStore()