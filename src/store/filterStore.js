import { makeAutoObservable, observable } from "mobx";  

class FilterQueryStore {
    allManufacturer = [];
    minPrice = 0;
    maxPrice = 0;
    manufacturerFilters = observable.object({});
    categoryFilters = observable.object({});
    priceFilterMin = 0;
    priceFilterMax = 0;
    hack = false;
    filter = false;
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
  };
  
export const filterQueryStore = new FilterQueryStore();