import {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import { observer } from 'mobx-react-lite';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './InputBox.module.scss';
import { ChangeEventHandler } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

type InputBoxProps = {
  labelName: string;
  type: string; 
  error?: any;
  errorMsg?: string;
  changeValue: ChangeEventHandler<HTMLInputElement>
}

type ValuesType = {
  password: string,
  showPassword: boolean
}

export const InputBox = observer(
  ( { labelName, type, error, errorMsg, changeValue }: InputBoxProps ) => {
    
    const {input, label, inputDiv, errorinput, button, helperText} = styles;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className={inputDiv}>
          <div className={label}>
          <Typography variant='caption' display='block'>
            {labelName}
          </Typography>
          </div>
          <input type={ type === 'password' && showPassword === true ? 'text' : type } 
          className={ error ? errorinput : input } placeholder={ error? errorMsg : '' }
          onChange={changeValue} />
          {type == 'password' ? 
            <IconButton className={button} onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton> : 
            null}
          <FormHelperText className={helperText}>{ error ? errorMsg : '' }</FormHelperText>
        </div>
    )
})
