import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  //margin: {
  //  margin: '0 0 0 50px'
  //},
  button: {
    color: '#f5f5f5',
    fontSize: '15px',
    fontWeight: 'bold'
  }
}));

export const LoginButton = () => {
  const {root, button} = useStyles();

  return (
    <div className={cn(root)}>
      <Typography>
      <Button id="loginButton" href="#text-buttons" className={button}>
        Login
      </Button>
      </Typography>
    </div>
  );
}
