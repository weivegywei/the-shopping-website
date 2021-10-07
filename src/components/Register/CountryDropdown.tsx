import FormControl from '@material-ui/core/FormControl';
import {Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import styles from './CountryDropdown.module.scss';
import { ChangeEvent } from 'react';
import { RegisterStoreKeys } from '../../store/registerStore';
import { BootstrapInputForCountryDropdown } from '../../util/BootstrapInput'

type CountryDropdownProps = {
  store: { 
    changeValue: (a: RegisterStoreKeys, b: string) => void,
    country: string
  };
}

export const CountryDropdown = observer(({store}: CountryDropdownProps) => {
  const {margin} = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(RegisterStoreKeys.country, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <Select
          value={store.country}
          onChange={changeValue}
          input={<BootstrapInputForCountryDropdown />}
          defaultValue='Finland'
        >
          <MenuItem value='Finland'>Finland</MenuItem>
          <MenuItem value='Sweden'>Sweden</MenuItem>
          <MenuItem value='Norway'>Norway</MenuItem>
          <MenuItem value='Estonia'>Estonia</MenuItem>
          <MenuItem value='Danmark'>Danmark</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
})
