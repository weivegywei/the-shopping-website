import { makeAutoObservable } from "mobx";  

class LoginStore {
    email = ''
    password = ''
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value
    }
  };
  
export const loginStore = new LoginStore()
