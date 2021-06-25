import { createContext, useState } from 'react';
import { CategoryType } from '../../../../store/productStore';

export enum SpecificationType {
    none = '',
    type = 'type',
    volume = 'volume',
    size = 'size',
    color = 'color',
    flavor = 'flavor',
    aroma = 'aroma'
}

export const EditProductContext = createContext({
    productName: '', manufacturer: '', itemInventory: 1, itemPrice: 1, itemSpecificationDescr: '', 
    itemPackageSize: '1*1*1',itemImageUrl: '', itemAvailability: true, itemCategory: 'skin care', itemSpecification: '',
    setProductName: (a:string) => ({}), setManufacturer: (a:string) => ({}), setItemInventory: (a:number) => ({}), 
    setItemPrice: (a:number) => ({}), setItemSpecification: (a:string) => ({}), 
    setItemSpecificationDescr: (a:string[]) => ({}), setItemPackageSize: (a:string) => ({}), 
    setItemAvailability: (a:boolean) => ({}), setItemImageUrl: (a:string) => ({}), setItemDescription: (a:string) => ({}), 
    setItemCategory: (a:string) => ({}), itemDescription: ''
});

export const useEditProductContext = () => {
    const [productName, setProductName] = useState<String>('');
    const [manufacturer, setManufacturer] = useState<String>('');
    const [itemInventory, setItemInventory] = useState<Number>(1);
    const [itemPrice, setItemPrice] = useState<Number>(1);
    const [itemSpecification, setItemSpecification] = useState<SpecificationType>(SpecificationType.none);
    const [itemSpecificationDescr, setItemSpecificationDescr] = useState<String>('');
    const [itemPackageSize, setItemPackageSize] = useState<String>('1*1*1');
    const [itemAvailability, setItemAvailability] = useState<Boolean>(true);
    const [itemImageUrl, setItemImageUrl] = useState<String>('');
    const [itemDescription, setItemDescription] = useState<String>('');
    const [itemCategory, setItemCategory] = useState<CategoryType>(CategoryType.skinCare);

    return {productName, setProductName, manufacturer, setManufacturer, itemInventory, setItemInventory, itemPrice, 
        setItemPrice, itemSpecification, setItemSpecification, itemSpecificationDescr, setItemSpecificationDescr, 
        itemPackageSize, setItemPackageSize, itemAvailability, setItemAvailability, itemImageUrl, setItemImageUrl, 
        itemDescription, setItemDescription, itemCategory, setItemCategory};
}