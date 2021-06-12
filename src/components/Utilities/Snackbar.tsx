import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from './SnackBar.module.scss';

type AlertProps = {
  severity: any;
  className: string;
}

type NotificationSnackbarProps = {
  state: 'error' | 'success';
  openNotification: boolean;
  setOpenNotification: (a: boolean) => void;
  errorMsg: string;
  successMsg: string;
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const NotificationSnackbar = (
  {state, openNotification, setOpenNotification, errorMsg, successMsg}: NotificationSnackbarProps) => {
  const {root, sucessStyle, errorStyle} = styles;

  const handleClose = (event: React.ChangeEvent<{}>, reason: any) => {
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
