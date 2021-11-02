import { makeAutoObservable } from "mobx";

export enum RegisterStoreKeys {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword',
    address = 'address',
    country = 'country',
    role = 'role',
    type = 'type', 
    status = 'status'
}

export type RoleType = {
    role: 'customer' | 'admin';
}

type TypeType = {
    type: 'regular' | 'guest'
}

type StatusType = {
    status: 'active' | 'inactive'
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
    type = 'regular'
    status = 'active'

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
    type: TypeType;
    status: StatusType;
    changeValue: (a: RegisterStoreKeys, b: string) => void;
}