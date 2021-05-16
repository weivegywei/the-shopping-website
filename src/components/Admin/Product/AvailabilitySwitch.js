import React from 'react';
import Switch from '@material-ui/core/Switch';
import { observer } from 'mobx-react-lite';

export const AvailabilitySwitch = observer(({store}) => {
  const changeValue = (e) => {store.changeValue('availability', e.target.checked)};

    return (
      <Switch
        checked={store.availability}
        onChange={(e) => {changeValue(e)}}
        name="availability"
        color="primary"
      />
    )
})