import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './InputBox.module.scss';
import { ChangeEventHandler } from 'react';

type InputBoxProps = {
  labelName: string;
  type: string; 
  error?: any;
  errorMsg?: string
  changeValue: ChangeEventHandler<HTMLInputElement>;
}

export const InputBox = observer(
  ( { labelName, type, error, errorMsg, changeValue }: InputBoxProps ) => {
    
    const {input, label, inputDiv, errorinput, helperText} = styles;

    return (
        <div className={inputDiv}>
          <div className={label}>
          <Typography variant='caption' display='block'>
            {labelName}
          </Typography>
          </div>
          <input type={type} className={error ? errorinput : input} placeholder={error? errorMsg : ''}
          onChange={changeValue} />
          <FormHelperText className={helperText}>{error? errorMsg : ''}</FormHelperText>
        </div>
    )
})
