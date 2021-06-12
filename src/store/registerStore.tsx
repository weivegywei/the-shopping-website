import { makeAutoObservable } from "mobx";

export enum RegisterStoreKeys {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword',
    address = 'address',
    country = 'country',
    role = 'role'
}

export type RoleType = {
    role: 'customer' | 'admin';
}

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

    changeValue(fieldName: RegisterStoreKeys, value: string) {
        this[fieldName] = value;
    }
};

export const registerStore = new RegisterStore()

export type RegisterStoreType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    country: string;
    role: RoleType;
    changeValue: (a: RegisterStoreKeys, b: string) => void;
}