import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import { ProductStoreKeys, ProductStoreType } from '../../../store/productStore';
import { ChangeEvent } from 'react';

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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

type SpecificationDropdownProps = {
  store: ProductStoreType
}

export const SpecificationDropdown = observer(
  ({store}: SpecificationDropdownProps) => {
  const {margin} = useStyles();
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(ProductStoreKeys.specification, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.specification}
          onChange={changeValue}
          input={<BootstrapInput />}
        >
          <option value='' />
          <option value='type'>type</option>
          <option value='volume'>volume</option>
          <option value='size'>size</option>
          <option value='color'>color</option>
          <option value='flavor'>flavor</option>
          <option value='aroma'>aroma</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
})
