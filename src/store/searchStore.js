import { makeAutoObservable } from "mobx";  

class SearchStore {
    query = ''
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value
    }
  };
  
export const searchStore = new SearchStore();

class SuggestionsStore {
    suggestion1 = ''
    suggestion2 = ''
    suggestion3 = ''
    suggestion4 = ''
    suggestion5 = ''
  
    constructor () {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName, value) {
        this[fieldName] = value
    }
  };
  
export const suggestionsStore = new SuggestionsStore();

