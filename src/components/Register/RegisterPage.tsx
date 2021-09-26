import { useState, useContext } from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import {InputBox} from '../Inputs/InputBox';
import { observer } from "mobx-react";
import { CountryDropdown } from './CountryDropdown';
import { registerStore as store, RegisterStoreKeys } from '../../store/registerStore';
import { postData } from '../../api/postData';
import styles from './RegisterPage.module.scss';
import { ChangeEvent } from 'react';
import { AppContext } from '../../AppContext';

export const RegisterPage = observer(() => {
  const {root, title, buttonDiv, buttons, signInButton, label} = styles;
  const [passwordMatchingState, setPasswordMatchingState] = useState(true);
  const [userExistsState, setUserExistsState] = useState(false);
  const history = useHistory(); 
  const { setOpenNotification, setSuccessMsg } = useContext(AppContext);

  const onBlur = () => {
      if (store.password !== store.confirmPassword) {
        setPasswordMatchingState(false);
    } else if (store.password === store.confirmPassword) {
        setPasswordMatchingState(true);
    }
  }

  const createNewUser = async() => {
    const res = await postData('/api/register', {
      firstName: store.firstName,
      lastName: store.lastName,
      email: store.email,
      password: store.password,
      address: store.address,
      country: store.country,
      role: store.role
    })
    if(res.error === 'USER_EXISTS') {
      setUserExistsState(true);
    } else {
      setOpenNotification(true);
      setSuccessMsg('Sign up succeed! Welcome! Please log in to continue');
      history.push('/login');
    }
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>, fieldName: RegisterStoreKeys) => 
    store.changeValue(fieldName, e.target.value)

  return (
    <div className={root}>
      <Paper elevation={0}>
        <div className={title}>
            SIGN UP
        </div>
        <InputBox labelName={'First name'} type={'text'} changeValue={(e) => changeValue(e, RegisterStoreKeys.firstName)} />
        <InputBox labelName={'Last name'} type={'text'} changeValue={(e) => changeValue(e, RegisterStoreKeys.lastName)} />
        <InputBox labelName={'Email address'} type={'email'}changeValue={(e) => changeValue(e, RegisterStoreKeys.email)} 
          error={userExistsState} errorMsg='This email had been registered' />
        <InputBox labelName={'Password'} type={'password'} changeValue={(e) => changeValue(e, RegisterStoreKeys.password)} />
        <InputBox labelName={'Confirm password'} type={'password'} error={!passwordMatchingState} onBlur={onBlur}
          errorMsg='Password does not match' changeValue={(e) => changeValue(e, RegisterStoreKeys.confirmPassword)} />
        <InputBox labelName={'Address'} type={'text'} changeValue={(e) => changeValue(e, RegisterStoreKeys.address)} />
        <div className={label}>
          <Typography variant='caption' display='block'>
            Country
          </Typography>
        </div>
        <CountryDropdown store={store} />
        <div className={buttonDiv} style={{marginTop: '30px'}}>
          <button type='submit' className={cn(buttons,signInButton)} 
          onClick={createNewUser} disabled={!passwordMatchingState}>SIGN UP</button>
        </div>
      </Paper>
    </div>
  );
})

