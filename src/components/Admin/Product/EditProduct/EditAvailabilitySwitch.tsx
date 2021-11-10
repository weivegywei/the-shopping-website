import { ChangeEvent } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SwitchWithStyles } from '../../../../util/SwitchWithStyles';

type EditAvailabilitySwitchProps = {
  itemAvailability: boolean;
  setItemAvailability: (a: boolean) => void
}

export const EditAvailabilitySwitch = ({itemAvailability, setItemAvailability}: EditAvailabilitySwitchProps) => {
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

