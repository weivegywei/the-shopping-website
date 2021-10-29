import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from './SnackBar.module.scss';

type AlertProps = {
  severity: 'error' | 'success' | 'warning' | 'info';
  //className: string;
}

type NotificationSnackbarProps = {
  notificationState: 'error' | 'success' | 'warning' | 'info';
  openNotification: boolean;
  setOpenNotification: (a: boolean) => void;
  snackbarMsg: string
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const NotificationSnackbar = (
  {notificationState, openNotification, setOpenNotification, snackbarMsg}: NotificationSnackbarProps) => {
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
        <Alert severity={notificationState} >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
