import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
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
        <NativeSelect
          value={store.country}
          onChange={changeValue}
          input={<BootstrapInputForCountryDropdown />}
        >
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
