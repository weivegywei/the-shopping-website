import { makeAutoObservable } from "mobx";

class ProductStore {
    productName = ''
    manufacturerName = ''
    inventory = 0 
    imageUrl = ''
    price = 0
    description = ''
    packageSize = ''
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
  
export const productStore = new ProductStore()