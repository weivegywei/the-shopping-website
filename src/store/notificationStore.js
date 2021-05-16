import { makeAutoObservable } from "mobx";

class NotificationStore {
    notifications=[]

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
}

export const notificationStore = new NotificationStore();