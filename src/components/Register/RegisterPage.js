import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {InputBox} from '../Inputs/InputBox';
import { observer } from "mobx-react";
import {CountryDropdown} from './CountryDropdown';
import { registerStore as store } from '../../store/registerStore';
import { postData } from '../../api/postData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    background: '#fcfcf0',
    height: '100vh',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(60),
      height: theme.spacing(88),
    },
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
      width: '286px', 
      height: '42px',
      borderColor: 'black', 
      border: 'solid 1px',
      fontWeight: '650',
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
      marginLeft: '82px'
  },
}));

export const RegisterPage = observer(() => {
  const {root, buttonDiv, buttons, signInButton, label} = useStyles();
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
  const res = await postData('/api/register', {
    firstName: store.firstName,
    lastName: store.lastName,
    email: store.email,
    password: store.password,
    address: store.address,
    country: store.country,
    role: store.role
  }).catch(function (error) {
    if(error.response.data === 'USER_EXISTS') {
        setUserExistsState(true)
    }
  })};

  return (
    <div className={root}>
      <Paper elevation={0}>
        <div style={{margin: '28px'}}>
          <Typography variant='h5'>
            Sign Up
          </Typography>
        </div>
        <InputBox labelName={'First name: '} type={'text'} store={store} fieldName='firstName' />
        <InputBox labelName={'Last name: '} type={'text'} store={store} fieldName='lastName' />
        <InputBox labelName={'Email address: '} type={'email'} store={store} fieldName='email' error={userExistsState} errorMsg='This email had been registered' />
        <InputBox labelName={'Password: '} type={'text'} store={store} fieldName='password' />
        <InputBox labelName={'Confirm password: '} type={'text'} store={store} error={!passwordMatchingState} errorMsg='Password not matching' fieldName='confirmPassword' />
        <InputBox labelName={'Address: '} store={store} fieldName='address' />
        <div className={label}>
          <Typography variant='caption' display='block'>
            Country: 
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