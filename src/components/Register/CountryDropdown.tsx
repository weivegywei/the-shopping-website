import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';
import styles from './CountryDropdown.module.scss';
import { ChangeEvent } from 'react';
import { RegisterStoreKeys } from '../../store/registerStore';

const inputBoxHeight = '22px';
const inputBoxWidth = `335px`;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    width: `${inputBoxWidth}`,
    height: `${inputBoxHeight}`,
    padding: '14px 22px 14px 10px',
    backgroundColor: '#fff',
    border: '1px solid lightgrey',
    fontSize: 14,
    fontWeight: 500,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      outline: 'none',
      border: 'solid 1px black'
    },
  }
}))(InputBase);

type CountryDropdownProps = {
  store: { 
    changeValue: (a: RegisterStoreKeys, b: string) => void,
    country: string
  };
}

export const CountryDropdown = observer(
  ({store}: CountryDropdownProps) => {
  const {margin} = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(RegisterStoreKeys.country, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.country}
          onChange={changeValue}
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
