import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import { ProductStoreKeys, ProductStoreType } from '../../../store/productStore';
import { ChangeEvent } from 'react';

type AvailabilitySwitchProps = {
  store: ProductStoreType;
}

export const AvailabilitySwitch = observer(
  ({store}: AvailabilitySwitchProps) => {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    store.changeValue(ProductStoreKeys.availability, e.target.checked)};
  const ASwitch = withStyles({
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
      <ASwitch
        checked={store.availability}
        onChange={changeValue}
        name="availability"
      />
    )
})