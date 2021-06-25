import { createContext, useState } from 'react';

export const SnackbarContext = createContext({state: 'success', setState: (a:string) => ({}), openNotification: false, 
setOpenNotification: (a:boolean) => ({}), errorMsg: 'Error', setErrorMsg: (a:string) => ({}), successMsg: 'Success',
setSuccessMsg: (a:string) => ({})});

export const useSnackbarContext = () => {
    const [openNotification, setOpenNotification] = useState<Boolean>(false);
    const [state, setState] = useState<String>('success');
    const [errorMsg, setErrorMsg] = useState<String>('Error');
    const [successMsg, setSuccessMsg] = useState<String>('Success');

    return {state, setState, openNotification, setOpenNotification, errorMsg, setErrorMsg, successMsg, setSuccessMsg};
}