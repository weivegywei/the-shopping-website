import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  sucessStyle: {
    background: '#8ba48a'
  },
  errorStyle: {
      background: 'red'
  }
}));

export const NotificationSnackbar = ({state, openNotification, setOpenNotification, errorMsg, successMsg}) => {
  const {root, sucessStyle, errorStyle} = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  return (
    <div className={root}>
      <Snackbar open={openNotification} autoHideDuration={4000} onClose={handleClose} >
        <Alert severity={state === 'error'? 'error' : "success"} className={state === 'error' ? errorStyle : sucessStyle } >
          {state === 'error' ? errorMsg : successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
