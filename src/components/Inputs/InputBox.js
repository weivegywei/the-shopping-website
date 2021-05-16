import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  input: {
      background: '#e8fdff',
      margin: '4px',
      width: '280px',
      height: '30px',
      borderColor: 'darkgrey', 
      border: 'solid 1px',
      fontWeight: '500',
      fontSize: '14px',
      '&:focus':{
        outline: 'none'
    }
  },
  errorinput: {
    background: '#e3ccca',
    margin: '4px',
    width: '280px',
    height: '30px',
    borderColor: 'darkgrey', 
    border: 'solid 1px',
    fontWeight: '500',
    fontSize: '14px',
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
    margin: '6px'
  }
}));

export const InputBox = observer(({labelName, type, store, fieldName, error, errorMsg}) => {
    const {input, label, inputDiv, errorinput} = useStyles();
  
    return (
        <div className={inputDiv}>
          <div className={label}>
          <Typography variant='caption' display='block'>
            {labelName}
          </Typography>
          </div>
          <input type={type} className={error ? errorinput : input} placeholder={error? errorMsg : ''}
          onChange={(e) => store.changeValue(fieldName, e.target.value)} />
        </div>
    )
})