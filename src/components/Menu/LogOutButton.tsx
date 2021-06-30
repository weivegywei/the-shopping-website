import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { userStore } from '../../store/userStore';
import styles from './LogOutButton.module.scss';

export const LogOutButton = ({logoutAction}) => {
  const {root, button} = styles;

  return (
    <div className={root}>
      <Typography variant='caption'>
      <Button id="logOutButton" href="#text-buttons" className={button} onClick={logoutAction}>
        Log Out
      </Button>
      </Typography>
    </div>
  );
}
