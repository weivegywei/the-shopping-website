import { createContext, useState } from 'react';
import { CategoryType } from './store/productStore';

export const AppContext = createContext({state: 'success', setState: (a:string) => ({}), openNotification: false, 
setOpenNotification: (a:boolean) => ({}), errorMsg: 'Error', setErrorMsg: (a:string) => ({}), successMsg: 'Success',
setSuccessMsg: (a:string) => ({}), menuCategory: '', setMenuCategory: (a:CategoryType | '') => ({})});

export const useAppContext = () => {
    const [openNotification, setOpenNotification] = useState<Boolean>(false);
    const [state, setState] = useState<String>('success');
    const [errorMsg, setErrorMsg] = useState<String>('Error');
    const [successMsg, setSuccessMsg] = useState<String>('Success');
    const [menuCategory, setMenuCategory] = useState<CategoryType | '' >('');

    return {state, setState, openNotification, setOpenNotification, errorMsg, setErrorMsg, 
        successMsg, setSuccessMsg, menuCategory, setMenuCategory};
}