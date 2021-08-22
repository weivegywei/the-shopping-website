import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from './SnackBar.module.scss';

type AlertProps = {
  severity: any;
  className: string;
}

type NotificationSnackbarProps = {
  notificationState: 'error' | 'success';
  openNotification: boolean;
  setOpenNotification: (a: boolean) => void;
  errorMsg: string;
  successMsg: string;
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const NotificationSnackbar = (
  {notificationState, openNotification, setOpenNotification, errorMsg, successMsg}: NotificationSnackbarProps) => {
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
        <Alert severity={notificationState === 'error'? 'error' : "success"} className={notificationState === 'error' ? errorStyle : sucessStyle } >
          {notificationState === 'error' ? errorMsg : successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
