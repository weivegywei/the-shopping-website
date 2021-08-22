import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInput } from '../../../util/BootstrapInput';
import { observer } from 'mobx-react-lite';
import { SpecificationType } from '../../../store/productStore';
import { ChangeEvent } from 'react';
import styles from './SpecificationDropdown.module.scss';

type SpecificationDropdownProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: SpecificationType
}

export const SpecificationDropdown = observer(({onChange, value}: SpecificationDropdownProps) => {
  const { formControl } = styles;
 
  return (
    <div>
      <FormControl className={formControl}>
        <NativeSelect
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          <option value='' />
          <option value='type'>type</option>
          <option value='volume'>volume</option>
          <option value='size'>size</option>
          <option value='color'>color</option>
          <option value='flavor'>flavor</option>
          <option value='aroma'>aroma</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
})
