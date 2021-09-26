import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { observer } from 'mobx-react-lite';
import styles from './EditStatusDropdown.module.scss';
import { OrderStatusStoreType, OrderStatusStoreKey } from '../../store/orderStatusStore';
import { ChangeEvent } from 'react';
import { BootstrapInputForEditStatusDropdown } from '../../util/BootstrapInput'
import { orderStatus } from '../../const/constants'

type EditStatusDropdownProps = {
  store: OrderStatusStoreType
}

export const EditStatusDropdown = observer(({store}: EditStatusDropdownProps) => {
  const {margin} = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(OrderStatusStoreKey.status, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.status}
          onChange={changeValue}
          input={<BootstrapInputForEditStatusDropdown />}
        >
          {orderStatus.map((item) => 
            <option value={`${item}`}>{item}</option>
          )}
        </NativeSelect>
      </FormControl>
    </div>
  );
})

