import { makeAutoObservable } from "mobx";

export enum OrderStatusStoreKey {
    status = 'status'
}

class OrderStatusStore {
    status = ''

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName: OrderStatusStoreKey, value: string) {
        this[fieldName] = value;
    }
};

export const orderStatusStore = new OrderStatusStore()

export type OrderStatusStoreType = {
    status: string;
    changeValue: (a: OrderStatusStoreKey, b: string) => void;
}