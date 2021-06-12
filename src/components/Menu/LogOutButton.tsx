import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './LogOutButton.module.scss';

export const LogOutButton = () => {
  const {root, button} = styles;

  return (
    <div className={root}>
      <Typography variant='caption'>
      <Button id="logOutButton" href="#text-buttons" className={button}>
        Log Out
      </Button>
      </Typography>
    </div>
  );
}
