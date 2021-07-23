import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

type backToHomeButtonProp = {
    onClick: () => void
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(3),
        fontSize: 20, 
        color: 'white',
        backgroundColor: '#506e69',
        height: 35,
        width: 170,
        letterSpacing: 1.3
      },
    },
}));

export const BackToHomeButton = ({onClick}: backToHomeButtonProp) => {
    const { root } = useStyles();

    return (
        <div className={root}>
            <Button onClick={onClick}>
                go back
            </Button>
        </div>
    )
}