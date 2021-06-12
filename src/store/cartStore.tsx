import { makeAutoObservable } from "mobx";

export enum CartStoreKeys {
    productId = 'productId',
    quantity = 'quantity',
    availability = 'availability',
    specification = 'specification',
    specificationDescr = 'specificationDescr'
}

type CartStoreValues = {
    productId: string;
    quantity: number;
    availability: boolean;
    specification: string;
    specificationDescr: string
}

export enum CartItemStoreKey {
    specificationValue = 'specificationValue'
}

export enum CartItemNumberStoreKey {
    cartItemNumber = 'cartItemNumber'
}

class CartStore {
    productId = ''
    quantity = 0 
    availability = true
    specification = ''
    specificationDescr = ''
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: CartStoreKeys, value: CartStoreValues) {
        // @ts-ignore
        this[fieldName] = value;
    }
  }
  
export const cartStore = new CartStore();

class CartItemStore {
    specificationValue = ''
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: CartItemStoreKey, value: string) {
        this[fieldName] = value;
    }
}

export const cartItemStore = new CartItemStore();

class CartItemNumberStore {
    cartItemNumber = 0
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: CartItemNumberStoreKey, value: number) {
        this[fieldName] = value;
    }
}

export const cartItemNumberStore = new CartItemNumberStore();

export type CartItemStoreType  = { 
    specificationValue: string;
    changeValue: (a: CartItemStoreKey, b: string) => void;
}

export type CartItemNumberStoreType = {
    cartItemNumber: number;
    changeValue: (a: CartItemNumberStoreKey, b: number) => void;
}
