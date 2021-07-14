import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export const EditAvailabilitySwitch = () => {
  const { itemAvailability, setItemAvailability } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => setItemAvailability(e.target.checked);

  const EASwitch = withStyles({
    switchBase: {
      color: '#a6b3a4',
      '&$checked': {
        color: '#506e69',
      },
      '&$checked + $track': {
        backgroundColor: '#506e69',
      },
    },
    checked: {},
    track: {},
  })(Switch);

    return (
      <FormControlLabel control={
        <EASwitch
        checked={itemAvailability}
        onChange={changeValue}
        name="availability"
        />}
      label='Availability' />
    )
}
