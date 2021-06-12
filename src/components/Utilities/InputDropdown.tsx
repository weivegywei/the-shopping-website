import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import { ProductStoreKeys, ProductStoreType, CategoryType } from '../../store/productStore';
import { ChangeEvent } from 'react';
import styles from './InputDropdown.module.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

type InputDropdownProps = {
  store: ProductStoreType;
  selectValue: CategoryType | null;
  options: CategoryType[];
}

export const InputDropdown = observer(
  ({store, selectValue, options}: InputDropdownProps) => {
  const {margin} = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(ProductStoreKeys.category, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={selectValue}
          onChange={changeValue}
          input={<BootstrapInput />}
        >
          <option value=''> </option>
          {options.map((item) => <option value={item}>{item}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
})
