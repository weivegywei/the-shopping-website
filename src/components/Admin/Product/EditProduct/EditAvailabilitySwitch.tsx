import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SwitchWithStyles } from '../../../../util/SwitchWithStyles';

export const EditAvailabilitySwitch = () => {
  const { itemAvailability, setItemAvailability } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => setItemAvailability(e.target.checked);

    return (
      <FormControlLabel control={
        <SwitchWithStyles
        checked={itemAvailability}
        onChange={changeValue}
        name="availability"
        />}
      label='Availability' />
    )
}

