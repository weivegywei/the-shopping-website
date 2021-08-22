import { createContext, useState } from 'react';
import { CategoryType, SpecificationType } from '../../../../store/productStore';

export type EditProductContextType = {
    productName: string;
    manufacturer: string;
    itemInventory: number;
    itemPrice: number;
    itemSpecification: string;
    itemSpecificationDescr: string[]; 
    itemPackageSize: string;
    itemImageUrl: string; 
    itemAvailability: boolean; 
    itemCategory: CategoryType; 
    itemDescription: string;
    setProductName: (productName:string) => void; 
    setManufacturer: (manufacturer:string) => void; 
    setItemInventory: (itemInventory:number) => void; 
    setItemPrice: (itemPrice:number) => void; 
    setItemSpecification: (itemSpecification:SpecificationType) => void; 
    setItemSpecificationDescr: (itemSpecificationDescr:string[]) => void; 
    setItemPackageSize: (itemPackageSize:string) => void; 
    setItemImageUrl: (itemImageUrl:string) => void; 
    setItemAvailability: (itemAvailability:boolean) => void; 
    setItemCategory: (itemCategory:CategoryType) => void;
    setItemDescription: (itemDescription:string) => void;
}

export const EditProductContext = createContext<EditProductContextType>({
    productName: '', 
    manufacturer: '', 
    itemInventory: 1, 
    itemPrice: 1, 
    itemSpecification: SpecificationType.none, 
    itemSpecificationDescr: [], 
    itemPackageSize: '1*1*1',
    itemImageUrl: '', 
    itemAvailability: true, 
    itemCategory: CategoryType.skinCare, 
    itemDescription: '',
    setProductName: (productName:string) => ({}), 
    setManufacturer: (manufacturer:string) => ({}), 
    setItemInventory: (itemInventory:number) => ({}), 
    setItemPrice: (itemPrice:number) => ({}), 
    setItemSpecification: (itemSpecification:SpecificationType) => ({}), 
    setItemSpecificationDescr: (itemSpecificationDescr:string[]) => ({}), 
    setItemPackageSize: (itemPackageSize:string) => ({}), 
    setItemImageUrl: (itemImageUrl:string) => ({}), 
    setItemAvailability: (itemAvailability:boolean) => ({}), 
    setItemCategory: (itemCategory:CategoryType) => ({}),
    setItemDescription: (itemDescription:string) => ({})
});

export const useEditProductContext = () => {
    const [productName, setProductName] = useState<string>('');
    const [manufacturer, setManufacturer] = useState<string>('');
    const [itemInventory, setItemInventory] = useState<number>(1);
    const [itemPrice, setItemPrice] = useState<number>(1);
    const [itemSpecification, setItemSpecification] = useState<SpecificationType>(SpecificationType.none);
    const [itemSpecificationDescr, setItemSpecificationDescr] = useState<string[]>([]);
    const [itemPackageSize, setItemPackageSize] = useState<string>('1*1*1');
    const [itemImageUrl, setItemImageUrl] = useState<string>('');
    const [itemAvailability, setItemAvailability] = useState<boolean>(true);
    const [itemCategory, setItemCategory] = useState<CategoryType>(CategoryType.skinCare);
    const [itemDescription, setItemDescription] = useState<string>('');

    return {productName, setProductName, manufacturer, setManufacturer, itemInventory, setItemInventory, itemPrice, 
        setItemPrice, itemSpecification, setItemSpecification, itemSpecificationDescr, setItemSpecificationDescr, 
        itemPackageSize, setItemPackageSize, itemAvailability, setItemAvailability, itemImageUrl, setItemImageUrl, 
        itemDescription, setItemDescription, itemCategory, setItemCategory};
}