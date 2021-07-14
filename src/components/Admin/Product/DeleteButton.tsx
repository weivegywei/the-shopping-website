import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import styles from './DeleteButton.module.scss';

type DeleteButtonProps = {
    onClick: () => void
}

export const DeleteButton = ({onClick}: DeleteButtonProps) => {
    const {button} = styles;
    return (
        <IconButton className={button} onClick={onClick} >
            <DeleteIcon />
        </IconButton>
    )
}
