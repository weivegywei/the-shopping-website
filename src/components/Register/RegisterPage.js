import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {InputBox} from '../Inputs/InputBox';
import { observer } from "mobx-react";
import { CountryDropdown } from './CountryDropdown';
import { registerStore as store } from '../../store/registerStore';
import { postData } from '../../api/postData';

const labelMargin = '79.5px';
const inputBoxWidth = `${335 + 10 + 25}px`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    background: '#fcfcf0',
    height: '140vh',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(66),
      height: theme.spacing(110),
    },
  },
  title: {
    margin: '34px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.018em'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
      width: `${inputBoxWidth}`, 
      height: '42px',
      borderColor: 'black', 
      border: 'solid 1px',
      fontWeight: '650',
      letterSpacing: '0.018em',
      '&:focus': {
        outline: 'none'
      }
  },
  signInButton: {
      background:'black',
      color: 'white',
    '&:hover': {
        backgroundColor: '#757575',
        cursor: 'pointer',
        borderColor: '#757575'
    }},
  label: {
      width: '300px', 
      display: 'flex', 
      justifyContent: 'flex-start', 
      marginLeft: `${labelMargin}`,
      letterSpacing: '0.012em'
  },
}));

export const RegisterPage = observer(() => {
  const {root, title, buttonDiv, buttons, signInButton, label} = useStyles();
  const [passwordMatchingState, setPasswordMatchingState] = useState(true);
  const [userExistsState, setUserExistsState] = useState(false);
  useEffect(() => {
    if (store.password !== store.confirmPassword) {
        setPasswordMatchingState(false);
    } else if (store.password === store.confirmPassword) {
        setPasswordMatchingState(true);
    }
  },[store.password, store.confirmPassword]);

const createNewUser = async() => {
  console.log('pre req')
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
  }
};

  return (
    <div className={root}>
      <Paper elevation={0}>
        <div className={title}>
            SIGN UP
        </div>
        <InputBox labelName={'First name'} type={'text'} store={store} fieldName='firstName' />
        <InputBox labelName={'Last name'} type={'text'} store={store} fieldName='lastName' />
        <InputBox labelName={'Email address'} type={'email'} store={store} fieldName='email' error={userExistsState} errorMsg='This email had been registered' />
        <InputBox labelName={'Password'} type={'text'} store={store} fieldName='password' />
        <InputBox labelName={'Confirm password'} type={'text'} store={store} error={!passwordMatchingState} errorMsg='Password does not match' fieldName='confirmPassword' />
        <InputBox labelName={'Address'} store={store} fieldName='address' />
        <div className={label}>
          <Typography variant='caption' display='block'>
            Country
          </Typography>
        </div>
        <CountryDropdown store={store} fieldName='country' />
        <div className={buttonDiv} style={{marginTop: '30px'}}>
          <button type='submit' className={cn(buttons,signInButton)} 
          onClick={createNewUser} disabled={!passwordMatchingState}>SIGN UP</button>
        </div>
      </Paper>
    </div>
  );
})