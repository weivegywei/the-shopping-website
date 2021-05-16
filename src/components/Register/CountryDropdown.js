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
    position: 'relative',
    width: '262px',
    height: '22px',
    backgroundColor: '#e8fdff',
    border: '1px solid darkgrey',
    fontSize: 14,
    fontWeight: '500',
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
    '&:focus': {
      outline: 'none',
    },
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const CountryDropdown = observer(({store}) => {
  const {margin} = useStyles();
  const changeValue = (e) => {store.changeValue('country', e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.country}
          onChange={(e) => {changeValue(e)}}
          input={<BootstrapInput />}
        >
          <option value='' />
          <option value='Finland'>Finland</option>
          <option value='Sweden'>Sweden</option>
          <option value='Norway'>Norway</option>
          <option value='Estonia'>Estonia</option>
          <option value='Danmark'>Danmark</option>
          <option value='Other'>Other</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
})
