import React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link, useHistory} from "react-router-dom";
import {InputBox} from '../Inputs/InputBox';
import { observer } from "mobx-react";
import { loginStore as store } from '../../store/loginStore';
import { postData } from '../../api/postData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    background: '#fcfcf0',
    height: '100vh',
    '& > *': {
      margin: theme.spacing(4),
      width: theme.spacing(60),
      height: theme.spacing(75),
    },
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
      width: '286px', 
      height: '46px',
      borderColor: 'black', 
      border: 'solid 1px',
      fontWeight: '650'
  },
  signInButton: {
      background:'black',
      color: 'white',
    '&:hover': {
        backgroundColor: '#757575',
        cursor: 'pointer',
        borderColor: '#757575'
    },
    '&:focus': {
        outline: 'none'
    }},
  signUpButton: {
      background:'white',
      color: 'black',
    '&:hover': {
        color: '#757575',
        cursor: 'pointer',
        borderColor: '#757575'
      },
    '&:focus': {
        outline: 'none'
    }
  }
}));

export const LoginPage = observer(() => {
  const {root, buttonDiv, buttons, signInButton, signUpButton} = useStyles();
  const history = useHistory(); 

  const loginAction = async() => {
    const res = await postData('/api/login',{
    email: store.email,
    password: store.password,
    });
    localStorage.setItem('accessToken',res.data.accessToken);
    history.push('/');
  }

  return (
    <div className={root}>
      <Paper elevation={0}>
        <div style={{margin: '50px'}}>
          <Typography variant='h4'>
            Sign in
          </Typography>
        </div>
        <InputBox labelName={'Email address: '} type={'email'} store={store} fieldName={'email'} />
        <InputBox labelName={'Password: '} type={'text'} store={store} fieldName={'password'} />
        <div className={buttonDiv} style={{marginTop: '65px'}}>
          <button type='submit' className={cn(buttons,signInButton)} onClick={loginAction}>SIGN IN</button>
        </div>
        <div className={buttonDiv} style={{marginTop: '15px'}}>
        <Link to="/register" style={{textDecoration: 'none'}}>
          <button type='submit' className={cn(buttons,signUpButton)}>SIGN UP</button>
        </Link>
        </div>
      </Paper>
    </div>
  );
})