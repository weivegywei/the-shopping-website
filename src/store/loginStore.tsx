import { makeAutoObservable } from "mobx";

export enum LoginStoreKeys {
    email = 'email',
    password = 'password'
}

class LoginStore {
    email = ''
    password = ''
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: LoginStoreKeys, value: string) {
        this[fieldName] = value
    }
  };
  
export const loginStore = new LoginStore()

export type LoginStoreType = {
    email: string;
    password: string;
    changeValue: (a: LoginStoreKeys, b: string) => void;
}
