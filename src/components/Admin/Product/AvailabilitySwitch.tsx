import Switch from '@material-ui/core/Switch';
import { observer } from 'mobx-react-lite';
import { ProductStoreKeys, ProductStoreType } from '../../../store/productStore';
import { ChangeEvent } from 'react';

type AvailabilitySwitchProps = {
  store: ProductStoreType;
}

export const AvailabilitySwitch = observer(
  ({store}: AvailabilitySwitchProps) => {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {store.changeValue(ProductStoreKeys.availability, e.target.checked)};

    return (
      <Switch
        checked={store.availability}
        onChange={changeValue}
        name="availability"
        color="primary"
      />
    )
})