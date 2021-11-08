import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import styles from './SnackBar.module.scss';

type AlertProps = {
  severity: 'error' | 'success' | 'warning' | 'info' | null;
}

type NotificationSnackbarProps = {
  notificationState: 'error' | 'success' | 'warning' | 'info' | null;
  setNotificationState: (notificationState: 'error' | 'success' | 'warning' | 'info' | null) => void;
  notificationMsg: string
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const NotificationSnackbar = () => {
  const { root } = styles;
  const { notificationState, setNotificationState, notificationMsg } = useContext(AppContext);

  const handleClose = (event: React.ChangeEvent<{}>, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationState(null);
  };

  return notificationState ? (
    <div className={root}>
      <Snackbar open={!!notificationState} autoHideDuration={4000} onClose={handleClose} >
        <Alert severity={notificationState} >
          {notificationMsg}
        </Alert>
      </Snackbar>
    </div>
  ) : null;
}
