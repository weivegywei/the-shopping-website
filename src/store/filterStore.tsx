import { makeAutoObservable, observable } from "mobx";  

export enum FilterQueryStoreKeys {
    allManufacturer = 'allManufacturer',
    minPrice = 'minPrice',
    maxPrice = 'maxPrice',
    manufacturerFilters = 'manufacturerFilters',
    categoryFilters = 'categoryFilters',
    priceFilterMin = 'priceFilterMin',
    priceFilterMax = 'priceFilterMax',
    hack = 'hack',
    filter = 'filter'
}

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
  
    changeValue(fieldName: FilterQueryStoreKeys, value: number | boolean | string[] | object) {
        //@ts-ignore
        this[fieldName] = value;
    }
  };
  
export const filterQueryStore = new FilterQueryStore();

export type AllManufacturerType = {
    name: string;
    logoUrl: string;
}

export type FilterQueryStoreType = {
    allManufacturer: AllManufacturerType[];
    minPrice: number;
    maxPrice: number;
    manufacturerFilters: object;
    categoryFilters: object;
    priceFilterMin: number;
    priceFilterMax: number;
    hack: boolean;
    filter: boolean;
    changeValue: (a: FilterQueryStoreKeys, b: number | boolean | string[] | object) => void
}