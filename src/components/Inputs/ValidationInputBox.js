import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '5px',
    width: '280px',
    height: '40px',
    border: 'solid 1px',
    fontWeight: '500',
    fontSize: '16px',
    '&:focus':{
      outline: 'none'
    }
  },
  label: {
    width: '300px', 
    display: 'flex', 
    justifyContent: 'flex-start', 
    marginLeft: '75px'
  },
  inputDiv: {
    display: 'block', 
    margin: '15px'
  }
}));

export function ValidationInputBox({labelName}) {
  const {inputDiv, label, input} = useStyles();

  return (
    <form className={inputDiv} noValidate autoComplete="off">
      <div className={label}>
      <Typography variant='caption' display='block'>
        {labelName}
      </Typography>
        <TextField
          error
          label="Error"
          defaultValue=""
          helperText="Unmatched password."
        />
      </div>
    </form>
  );
}
