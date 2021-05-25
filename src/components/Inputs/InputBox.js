import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import FormHelperText from '@material-ui/core/FormHelperText';

const labelMargin = '79.5px';
const inputBoxHeight = '22px';
const inputBoxWidth = `335px`;

const useStyles = makeStyles((theme) => ({
  input: {
      background: '#fff',
      margin: '4px',
      padding: '14px 22px 14px 10px',
      width: `${inputBoxWidth}`,
      height: `${inputBoxHeight}`,
      borderColor: 'lightgrey', 
      border: 'solid 1px',
      fontWeight: '500',
      fontSize: '14px',
      '&:focus':{
        outline: 'none',
        border: 'solid 1px black'    
      }
  },
  errorinput: {
    background: '#fff',
    margin: '4px',
    padding: '14px 22px 14px 10px',
    width: `${inputBoxWidth}`,
    height: `${inputBoxHeight}`,
    borderColor: 'lightgrey', 
    border: 'solid 1px',
    fontWeight: '500',
    fontSize: '14px',
    '&:focus':{
      outline: 'none',
      border: 'solid 1px red'
  }
},
  label: {
    width: '300px', 
    display: 'flex', 
    justifyContent: 'flex-start', 
    marginLeft: `${labelMargin}`,
    letterSpacing: '0.012em'
  },
  inputDiv: {
    display: 'block', 
    margin: '13px 0 13px 0'
  },
  helperText: {
    marginLeft: `${labelMargin}`,
    color: 'red'
  }
}));

export const InputBox = observer(({labelName, type, store, fieldName, error, errorMsg}) => {
    const {input, label, inputDiv, errorinput, helperText} = useStyles();
  
    return (
        <div className={inputDiv}>
          <div className={label}>
          <Typography variant='caption' display='block'>
            {labelName}
          </Typography>
          </div>
          <input type={type} className={error ? errorinput : input} placeholder={error? errorMsg : ''}
          onChange={(e) => store.changeValue(fieldName, e.target.value)} />
          <FormHelperText className={helperText}>{error? errorMsg : ''}</FormHelperText>
        </div>
    )
})