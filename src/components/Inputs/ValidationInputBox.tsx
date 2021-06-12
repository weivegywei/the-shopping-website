import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styles from './ValidationInputBox.module.scss';

export const ValidationInputBox = ({labelName}: {labelName: string}) => {
  const {inputDiv, label, input} = styles;

  return (
    <form className={inputDiv} noValidate autoComplete="off">
      <div className={label}>
      <Typography variant='caption' display='block'>
        {labelName}
      </Typography>
        <TextField
          error
          label="Error"
          defaultValue=""
          helperText="Unmatched password."
        />
      </div>
    </form>
  );
}
