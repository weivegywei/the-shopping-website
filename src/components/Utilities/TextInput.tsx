import { ListItem, ListItemText }from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
    inputLabel: string;
    type: string;
    errorMessage?: string;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = observer(
    ({inputLabel, type, changeValue, errorMessage, ...rest}: TextInputProps) => {
    const {formField, input, errorinput, errorDiv,errorMsg} = styles;

    return (
        <ListItem divider className={formField}>
            <ListItemText primary={inputLabel} />
            <div className={errorDiv} {...rest}>
                <input 
                    type={type} 
                    className={errorMessage ? errorinput : input} 
                    //@ts-ignore
                    onChange={changeValue}
                ></input>
                <div className={errorMsg}>
                {errorMessage ? errorMessage : ''}
                </div>
            </div>
        </ListItem>
    )
})

