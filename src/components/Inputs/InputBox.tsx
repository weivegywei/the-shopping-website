import { useState, ChangeEventHandler} from 'react';
import { Typography, FormHelperText, IconButton} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import styles from './InputBox.module.scss';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

type InputBoxProps = {
  labelName: string;
  type: string; 
  value?: string;
  error?: any;
  errorMsg?: string;
  changeValue: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void
}

export const InputBox = observer(
  ( { labelName, type, value, error, errorMsg, changeValue, onBlur }: InputBoxProps ) => {
    
    const {input, inputLabel, inputDiv, errorinput, button, helperText} = styles;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className={inputDiv}>
          <div className={inputLabel}>
          <Typography variant='caption' display='block'>
            {labelName}
          </Typography>
          </div>
          <input type={ type === 'password' && showPassword === true ? 'text' : type } value={value}
          className={ error ? errorinput : input } placeholder={ error? errorMsg : '' } onBlur={onBlur}
          onChange={changeValue} data-test={`input-${labelName.split(' ').join('')}`}/>
          {type === 'password' ? 
            <IconButton className={button} onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton> : 
            null}
          <FormHelperText className={helperText}>{ error ? errorMsg : '' }</FormHelperText>
        </div>
    )
})
