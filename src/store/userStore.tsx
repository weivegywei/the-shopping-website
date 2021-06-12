import { makeAutoObservable } from "mobx";

enum UserStoreKeys {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    id = 'id'
}

type ValuesProps = {
    firstName: string;
    lastName: string;
    email: string;
    _id:  string;
}

class UserStore {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    id: string | undefined;

    constructor () {
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.id = undefined;
        makeAutoObservable(this);
    }

    setValues(values: ValuesProps) {
        this.firstName = values.firstName;
        this.lastName = values.lastName;
        this.email = values.email;
        this.id = values._id;
    }
}

export const userStore = new UserStore();

export type UserStoreType = {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    id: string | undefined;
}