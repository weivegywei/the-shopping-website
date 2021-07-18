import { useState } from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from "react-router-dom";
import { InputBox } from '../Inputs/InputBox';
import { observer } from "mobx-react";
import { loginStore as store, LoginStoreKeys } from '../../store/loginStore';
import { postData } from '../../api/postData';
import styles from './LoginPage.module.scss';
import { ChangeEvent } from 'react';
import { getUserInfo } from '../../App.util';

export const LoginPage = observer(() => {
  const {root, paper, title, buttons, signInButton, signUpButton, buttonDiv} = styles;
  const history = useHistory(); 
  const [loginErrorState, setLoginErrorState] = useState(false);

  const loginAction = async() => {
    const res = await postData('/api/login',{
      email: store.email,
      password: store.password,
    });
    if (res.data) {
      localStorage.setItem('accessToken',res.data.accessToken);
      getUserInfo();
      history.push('/');
    } else {
      setLoginErrorState(true);
    }
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>, fieldName: LoginStoreKeys) => 
    store.changeValue(fieldName, e.target.value)

  return (
    <div className={root}>
      <Paper className={paper} elevation={0}>
        <div className={title}>
            SIGN IN
        </div>
        <InputBox labelName='Email address' type='email' changeValue={(e) => changeValue(e, LoginStoreKeys.email)} 
          error={loginErrorState} errorMsg='Email or password incorrect'/>
        <InputBox labelName='Password' type='text' changeValue={(e) => changeValue(e, LoginStoreKeys.password)} 
          error={loginErrorState} errorMsg='Email or password incorrect'/>
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