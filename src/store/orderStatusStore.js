import { makeAutoObservable } from "mobx";

class OrderStatusStore {
    status = ''

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
};

export const orderStatusStore = new OrderStatusStore()