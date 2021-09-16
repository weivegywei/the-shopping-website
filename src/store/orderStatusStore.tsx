import { makeAutoObservable } from "mobx";
import { orderStatus } from '../const/constants'

export enum OrderStatusStoreKey {
    status = 'status'
}

export enum OrderStatusStoreValue {

}

class OrderStatusStore {
    status = 'paid'

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
    changeValue: (status: OrderStatusStoreKey, value: string) => void;
}

