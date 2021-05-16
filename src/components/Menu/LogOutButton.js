import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  button: {
    color:'#f5f5f5',
    fontWeight: 'bold',
    height: '25px',
    padding: '0',
    width: '70px'
  }
}));

export const LogOutButton = () => {
  const {root, button} = useStyles();

  return (
    <div className={root}>
      <Typography variant='caption'>
      <Button id="logOutButton" href="#text-buttons" className={button}>
        Log Out
      </Button>
      </Typography>
    </div>
  );
}
