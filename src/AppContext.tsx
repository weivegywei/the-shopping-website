import { createContext, useState } from 'react';
import { CategoryType } from './store/productStore';

export type AppContextType = {
    setNotificationInfo: (a: 'error' | 'success' | 'warning' | 'info' | null, b: string) => void;
    notificationState: 'error' | 'success' | 'warning' | 'info' | null; 
    setNotificationState: (notificationState: 'error' | 'success' | 'warning' | 'info' | null) => void;
    notificationMsg: string;
    setNotificationrMsg: (notificationMsg: string) => void, 
    menuCategory: CategoryType | '' ; 
    setMenuCategory: (menuCategory: CategoryType | '') => void;
    cartItemNumber: number;
    setCartItemNumber: (cartItemNumber: number) => void;
    wishlistItemNumber: number;
    setWishlistItemNumber: (wishlistItemNumber: number) => void;
    allManufacturer: string[];
    setAllManufacturer: (allManufacturer: string[]) => void;
    manufacturerFilter: string[];
    setManufacturerFilter: (manufacturerFilter: string[]) => void;
    userCountry: string;
    setUserCountry: (userCountry: string) => void;
    cartTotalAmount: number;
    setCartTotalAmount: (cartTotalAmount: number) => void;
    itemSpecificationValue: string;
    setItemSpecificationValue: (itemSpecificationValue: string) => void;
}

export const AppContext = createContext<AppContextType>({
    setNotificationInfo: (a: 'error' | 'success' | 'warning' | 'info' | null, b: string) => ({}),
    notificationState: null, 
    setNotificationState: (notificationState: 'error' | 'success' | 'warning' | 'info' | null) => ({}), 
    notificationMsg: '',
    setNotificationrMsg: (notificationMsg: string) => ({}), 
    menuCategory: '', 
    setMenuCategory: (menuCategory: CategoryType | '') => ({}),
    cartItemNumber: 0,
    setCartItemNumber: (cartItemNumber: number) => ({}),
    wishlistItemNumber: 0,
    setWishlistItemNumber: (wishlistItemNumber: number) => ({}),
    allManufacturer: [],
    setAllManufacturer: (allManufacturer: string[]) => ({}),
    manufacturerFilter: [],
    setManufacturerFilter: (manufacturerFilter: string[]) => ({}),
    userCountry: '',
    setUserCountry: (userCountry: string) => ({}),
    cartTotalAmount: 0,
    setCartTotalAmount: (cartTotalAmount: number) => ({}),
    itemSpecificationValue: '',
    setItemSpecificationValue: (itemSpecificationValue: string) => ({}),
});

export const useAppContext = () => {
    const [ notificationState, setNotificationState ] = useState<'error' | 'success' | 'warning' | 'info' | null>(null);
    const [ notificationMsg, setNotificationrMsg ] = useState<string>('');
    const [ menuCategory, setMenuCategory ] = useState<CategoryType | '' >('');
    const [ cartItemNumber, setCartItemNumber ] = useState<number>(0);
    const [ wishlistItemNumber, setWishlistItemNumber ] = useState<number>(0);
    const [ allManufacturer, setAllManufacturer ] = useState<string[]>([]);
    const [ manufacturerFilter, setManufacturerFilter ] = useState<string[]>([]);
    const [ userCountry, setUserCountry ] = useState<string>('');
    const [ cartTotalAmount, setCartTotalAmount ] = useState<number>(0);
    const [ itemSpecificationValue, setItemSpecificationValue ] = useState<string>('');

    const setNotificationInfo = (a: 'error' | 'success' | 'warning' | 'info' | null, b: string) => {
        setNotificationState(a);
        setNotificationrMsg(b)
    }

    return { setNotificationInfo, notificationState, setNotificationState, notificationMsg,
        setNotificationrMsg , menuCategory, setMenuCategory, cartItemNumber, setCartItemNumber, wishlistItemNumber, 
        setWishlistItemNumber, allManufacturer, setAllManufacturer, manufacturerFilter, setManufacturerFilter,
        userCountry, setUserCountry, cartTotalAmount, setCartTotalAmount, itemSpecificationValue, 
        setItemSpecificationValue };
}

