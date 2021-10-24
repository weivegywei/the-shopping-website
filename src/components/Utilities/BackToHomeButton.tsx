import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

type backToHomeButtonProp = {
    onClick: () => void;
    buttonMsg: string
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(3),
        fontSize: 20, 
        color: 'white',
        backgroundColor: '#506e69',
        height: 45,
        width: 200,
        letterSpacing: 1.3,
        '&:hover': {
            backgroundColor: '#cad2a8'
        }
      },
    },
}));

export const BackToHomeButton = ({onClick, buttonMsg}: backToHomeButtonProp) => {
    const { root } = useStyles();

    return (
        <div className={root}>
            <Button onClick={onClick}>
                {buttonMsg}
            </Button>
        </div>
    )
}