import { Select, FormControl, MenuItem } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import styles from './CountryDropdown.module.scss';
import { useContext, ChangeEvent, ChangeEventHandler } from 'react';
import { RegisterStoreKeys } from '../../store/registerStore';
import { BootstrapInputForCountryDropdown } from '../../util/BootstrapInput'
import { AppContext } from '../../AppContext'

type CountryDropdownProps = {
  store?: { 
    changeValue: (a: RegisterStoreKeys, b: string) => void,
    country: string
  };
  //setValue?: ChangeEventHandler<HTMLSelectElement>
}

export const CountryDropdown = observer(({store}: CountryDropdownProps) => {
  const { margin } = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(RegisterStoreKeys.country, e.target.value)};
  const { userCountry, setUserCountry } = useContext(AppContext);
  console.log(userCountry, 'userCountry')

  return (
    <div>
      <FormControl className={margin}>
        <Select
          value={userCountry}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserCountry(e.target.value)}
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
