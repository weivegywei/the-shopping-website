import { SwitchWithStyles } from '.././../../util/SwitchWithStyles';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';

type AvailabilitySwitchProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AvailabilitySwitch = observer(({checked, onChange}: AvailabilitySwitchProps) => {

    return (
      <SwitchWithStyles
        checked={checked}
        onChange={onChange}
        name="availability"
      />
    )
})

