import { makeAutoObservable } from "mobx";

class UserStore {
    firstName=undefined
    lastName=undefined
    email=undefined
    id=undefined

    constructor () {
        makeAutoObservable(this);
    }

    setValues(values) {
        this.firstName = values.firstName;
        this.lastName = values.lastName;
        this.email = values.email;
        this.id = values._id;
    }
}

export const userStore = new UserStore();