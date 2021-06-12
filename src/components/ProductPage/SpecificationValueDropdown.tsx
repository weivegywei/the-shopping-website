import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { CartItemStoreType } from '../../store/cartStore';

/* const BootstrapInput = ({theme}) => {
  return <InputBase style={{
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
      textTransform: 'capitalize',
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    }
  }} />
} */

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
    textTransform: 'capitalize',
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
    cartItemStore.changeValue('specificationValue', e.target.value)
  
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
