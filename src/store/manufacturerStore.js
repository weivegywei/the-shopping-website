import { makeAutoObservable } from "mobx";

class ManufacturerStore {
    manufacturerName=''
    logoUrl=''

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName, value) {
        this[fieldName] = value;
    }
}

export const manufacturerStore = new ManufacturerStore();