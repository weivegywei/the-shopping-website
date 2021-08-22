import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInputForSpecificationValueDropdown } from '../../util/BootstrapInput';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { CartItemStoreType, CartItemStoreKey } from '../../store/cartStore';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  }
}));

type SpecificationValueDropdownProps = {
    cartItemStore: CartItemStoreType;
    values: string ;
}

export const SpecificationValueDropdown = observer(
  ({cartItemStore, values}: SpecificationValueDropdownProps) => {
  const {margin} = useStyles();
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => 
    cartItemStore.changeValue(CartItemStoreKey.specificationValue, e.target.value)
  
  const specificationValueArr = values[0].split(',');

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={cartItemStore.specificationValue}
          onChange={changeValue}
          input={<BootstrapInputForSpecificationValueDropdown />}
        >
          <option value=''> </option>
          {specificationValueArr.map((item) => <option value={item}>{item}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
})
