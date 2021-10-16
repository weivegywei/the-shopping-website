import { createContext, useState } from 'react';
import { CategoryType } from './store/productStore';

export type AppContextType = {
    notificationState: 'error' | 'success'; 
    setNotificationState: (notificationState: 'error' | 'success') => void, 
    openNotification: boolean; 
    setOpenNotification: (openNotification: boolean) => void,
    errorMsg: string;
    setErrorMsg: (errorMsg: string) => void, 
    successMsg: string;
    setSuccessMsg: (successMsg: string) => void,
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
    guestFirstName: string;
    setGuestFirstName: (guestFirstName: string) => void;
    guestLastName: string;
    setGuestLastName: (guestLastName: string) => void;
    guestEmail: string;
    setGuestEmail: (guestEmail: string) => void;
    guestAddress: string;
    setGuestAddress: (guestAddress: string) => void;
    cartTotalAmount: number;
    setCartTotalAmount: (cartTotalAmount: number) => void;
}

export const AppContext = createContext<AppContextType>({
    notificationState: 'success', 
    setNotificationState: (notificationState: 'error' | 'success') => ({}), 
    openNotification: false, 
    setOpenNotification: (openNotification: boolean) => ({}),
    errorMsg: '',
    setErrorMsg: (errorMsg: string) => ({}), 
    successMsg: '',
    setSuccessMsg: (successMsg: string) => ({}),
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
    guestFirstName: '',
    setGuestFirstName: (guestFirstName: string) => ({}),
    guestLastName: '',
    setGuestLastName: (guestLastName: string) => ({}),
    guestEmail: '',
    setGuestEmail: (guestEmail: string) => ({}),
    guestAddress: '',
    setGuestAddress: (guestAddress: string) => ({}),
    cartTotalAmount: 0,
    setCartTotalAmount: (cartTotalAmount: number) => ({})
});

export const useAppContext = () => {
    const [ openNotification, setOpenNotification ] = useState<boolean>(false);
    const [ notificationState, setNotificationState ] = useState<'error' | 'success'>('success');
    const [ errorMsg, setErrorMsg ] = useState<string>('Error');
    const [ successMsg, setSuccessMsg ] = useState<string>('Success');
    const [ menuCategory, setMenuCategory ] = useState<CategoryType | '' >('');
    const [ cartItemNumber, setCartItemNumber ] = useState<number>(0);
    const [ wishlistItemNumber, setWishlistItemNumber ] = useState<number>(0);
    const [ allManufacturer, setAllManufacturer ] = useState<string[]>([]);
    const [ manufacturerFilter, setManufacturerFilter ] = useState<string[]>([]);
    const [ userCountry, setUserCountry ] = useState<string>('');
    const [ cartTotalAmount, setCartTotalAmount ] = useState<number>(0);
    const [ guestFirstName, setGuestFirstName ] = useState<string>('');
    const [ guestLastName, setGuestLastName ] = useState<string>('');
    const [ guestEmail, setGuestEmail ] = useState<string>('');
    const [ guestAddress, setGuestAddress ] = useState<string>('');

    return { notificationState, setNotificationState, openNotification, setOpenNotification, errorMsg, setErrorMsg, 
        successMsg, setSuccessMsg, menuCategory, setMenuCategory, cartItemNumber, setCartItemNumber, 
        wishlistItemNumber, setWishlistItemNumber, allManufacturer, setAllManufacturer, manufacturerFilter, 
        setManufacturerFilter, userCountry, setUserCountry, cartTotalAmount, setCartTotalAmount, 
        guestFirstName, setGuestFirstName, guestLastName, setGuestLastName, guestEmail, setGuestEmail, 
        guestAddress, setGuestAddress};
}

