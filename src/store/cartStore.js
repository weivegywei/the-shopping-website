import { makeAutoObservable } from "mobx";

class CartStore {
    productId = ''
    quantity = 0 
    availability = true
    specification = ''
    specificationDescr = ''
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
  }
  
export const cartStore = new CartStore();

class CartItemStore {
    specificationValue = ''
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
}

export const cartItemStore = new CartItemStore();

class CartItemNumberStore {
    cartItemNumber = 0
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
}

export const cartItemNumberStore = new CartItemNumberStore();