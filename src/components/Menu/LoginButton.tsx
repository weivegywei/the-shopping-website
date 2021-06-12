import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './LoginButton.module.scss';

export const LoginButton = () => {
  const {root, button} = styles;

  return (
    <div className={root}>
      <Typography>
      <Button id="loginButton" href="#text-buttons" className={button}>
        Login
      </Button>
      </Typography>
    </div>
  );
}
