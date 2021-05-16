import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    button: {
        padding: '0'
    }
  });

export const DeleteButton = ({onClick}) => {
    const {button} = useStyles();
    return (
        <IconButton className={button}>
            <DeleteIcon onClick={onClick} />
        </IconButton>
    )
}