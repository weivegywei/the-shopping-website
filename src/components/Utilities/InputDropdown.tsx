import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInput } from '../../util/BootstrapInput';
import { observer } from 'mobx-react-lite';
import { ProductStoreKeys, ProductStoreType, CategoryType } from '../../store/productStore';
import { ChangeEvent } from 'react';
import styles from './InputDropdown.module.scss';

type InputDropdownProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectValue: CategoryType | null;
  options: CategoryType[];
}

export const InputDropdown = observer(
  ({onChange, selectValue, options}: InputDropdownProps) => {
  const { margin } = styles;
  //const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {store.changeValue(ProductStoreKeys.category, e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={selectValue}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          <option value=''> </option>
          {options.map((item) => <option value={item} key={item}>{item}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
})
