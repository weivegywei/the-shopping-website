import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import styles from './EditStatusDropdown.module.scss';
import { OrderStatusStoreType, OrderStatusStoreKey } from '../../store/orderStatusStore';
import { ChangeEvent } from 'react';

type EditStatusDropdownProps = {
  store: OrderStatusStoreType;
}

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    width: '262px',
    height: '22px',
    backgroundColor: '#e8fdff',
    border: '1px solid darkgrey',
    fontSize: 14,
    fontWeight: 500,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      outline: 'none',
    },
  }
}))(InputBase);

export const EditStatusDropdown = observer(({store}: EditStatusDropdownProps) => {
  const {margin} = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(OrderStatusStoreKey.status, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.status}
          onChange={changeValue}
          input={<BootstrapInput />}
        >
          <option value='paid'>Paid</option>
          <option value='shipped'>Shipped</option>
          <option value='delivered'>Delivered</option>
          <option value='returned'>Returned</option>
          <option value='refunded'>Refunded</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
})
