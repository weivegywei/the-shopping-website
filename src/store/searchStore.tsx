import { makeAutoObservable } from "mobx";  

export enum SearchStoreKey {
    query = 'query'
}

class SearchStore {
    query = ''
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: SearchStoreKey, value: string) {
        this[fieldName] = value
    }
  };
  
export const searchStore = new SearchStore();

export type SearchStoreType = {
    query: string;
    changeValue: (a: SearchStoreKey, b: string) => void;
}

