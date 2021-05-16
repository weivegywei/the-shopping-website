import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(() => ({
    formField: {
        height: '60px',
    },
    input: {
        height: '35px',
        width: '330px',
        border: 'none',
        fontSize: '15px',
        '&:focus': {
            outline: 'none',
        }
    },
    errorinput: {
        background: '#e3ccca',
        width: '330px',
        height: '30px',
        borderColor: 'darkgrey', 
        border: 'solid 1px',
        fontWeight: '500',
        fontSize: '14px',
        justifySelf: 'end',
        '&:focus':{
          outline: 'none'
        }
    },
    errorDiv: {
        textAlign: 'right'
    },
    errorMsg: {
        fontSize: '12px',
        color: 'red'
    }
}));

export const InfoEntryFramework = observer(({item, store}) => {
    const {formField, input, errorinput, errorDiv,errorMsg} = useStyles();

    return (
        <ListItem divider className={formField}>
            <ListItemText primary={item.primary} />
            <div className={errorDiv}>
                <input 
                    type={item.type} 
                    className={item.error ? errorinput : input} 
                    onChange={(e) => store.changeValue(item.key, e.target.value)
                }></input>
                <div className={errorMsg}>
                {item.errorMessage ? item.errorMessage : ''}
                </div>
            </div>
        </ListItem>
    )
})