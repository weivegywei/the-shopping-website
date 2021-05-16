import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';

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
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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

export const SpecificationValueDropdown = observer(({cartItemStore, values}) => {
  const {margin} = useStyles();
  const changeValue = (e) => {cartItemStore.changeValue('specificationValue', e.target.value)};
  const specificationValueArr = values[0].split(',');

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={cartItemStore.specificationValue}
          onChange={(e) => {changeValue(e)}}
          input={<BootstrapInput />}
        >
          <option value=''> </option>
          {specificationValueArr.map((item) => <option value={item}>{item}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
})
