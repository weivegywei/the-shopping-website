import { makeAutoObservable } from "mobx";

export enum ProductStoreKeys {
    productName = 'productName',
    manufacturerName = 'manufacturerName',
    inventory = 'inventory',
    imageUrl = 'imageUrl',
    price = 'price',
    description = 'description',
    packageSize = 'packageSize',
    availability = 'availability',
    specification = 'specification',
    specificationDescr = 'specificationDescr',
    category = 'category'
}

export enum CategoryType {
    skinCare = 'skin care',
    garments = 'garments',
    electricAppliances = 'electric appliances',
    fitness = 'fitness',
    footwears = 'footwears',
    perfumesAndFragrances = 'perfumes & fragrances',
    personalProtectiveEquipment = 'personal protective equipment',
    cosmetics = 'cosmetics',
    kitchenware = 'kitchenware',
    beddings = 'beddings'
}

export enum SpecificationType {
    none = '',
    type = 'type',
    volume = 'volume',
    size = 'size',
    color = 'color',
    flavor = 'flavor',
    aroma = 'aroma'
}

export type ProductStoreType = {
    productName: string;
    manufacturerName: string;
    inventory: number;
    imageUrl: string;
    price: number;
    description: string;
    packageSize: string;
    availability: boolean;
    specification: SpecificationType;
    specificationDescr: string[];
    category: CategoryType | null;
    changeValue: (a: ProductStoreKeys, b: string | number | boolean) => void
}

class ProductStore {
    productName = ''
    manufacturerName = ''
    inventory = 0 
    imageUrl = ''
    price = 0
    description = ''
    packageSize = ''
    availability = true
    specification = SpecificationType.none
    specificationDescr = ['']
    category = null
  
    constructor() {
        makeAutoObservable(this)
    }
  
    changeValue(fieldName: ProductStoreKeys, value: string | number | boolean | string[]) {
        //@ts-ignore
        this[fieldName] = value;
    }
  }
  
export const productStore = new ProductStore();



