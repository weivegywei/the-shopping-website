import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { CartItemStoreType, CartItemStoreKey } from '../../store/cartStore';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 265,
    height: 30,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    textTransform: 'capitalize',
    '&:focus': {
      border: '2px solid black',
    },
  },
}))(InputBase);

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
          input={<BootstrapInput />}
        >
          <option value=''> </option>
          {specificationValueArr.map((item) => <option value={item}>{item}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
})
