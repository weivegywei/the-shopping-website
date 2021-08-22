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
    setCartItemNumber: (cartItemNumber: number) => void
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
    setCartItemNumber: (cartItemNumber: number) => ({})
});

export const useAppContext = () => {
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [notificationState, setNotificationState] = useState<'error' | 'success'>('success');
    const [errorMsg, setErrorMsg] = useState<string>('Error');
    const [successMsg, setSuccessMsg] = useState<string>('Success');
    const [menuCategory, setMenuCategory] = useState<CategoryType | '' >('');
    const [cartItemNumber, setCartItemNumber] = useState<number>(0);

    return {notificationState, setNotificationState, openNotification, setOpenNotification, errorMsg, setErrorMsg, 
        successMsg, setSuccessMsg, menuCategory, setMenuCategory, cartItemNumber, setCartItemNumber};
}

