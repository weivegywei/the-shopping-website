import { makeAutoObservable } from "mobx";

export enum ManufacturerStoreKeys {
    manufacturerName = "manufacturerName",
    logoUrl = "logoUrl"
}

class ManufacturerStore {
    manufacturerName=''
    logoUrl=''

    constructor () {
        makeAutoObservable(this);
    }

    changeValue(fieldName: ManufacturerStoreKeys, value: string) {
        this[fieldName] = value;
    }
}

export const manufacturerStore = new ManufacturerStore();

export type manufacturerStoreType = {
    manufacturerName: string;
    logoUrl: string;
    changeValue: (a: ManufacturerStoreKeys, b: string) => void;
}
