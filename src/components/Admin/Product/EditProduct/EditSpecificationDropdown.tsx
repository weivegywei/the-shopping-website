import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInput } from '../../../../util/BootstrapInput';
import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './EditSpecificationDropdown.module.scss';

export const EditSpecificationDropdown = () => {
  const { margin, label } = styles;
  const { itemSpecification, setItemSpecification } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLSelectElement>, setNotificationState) => {setNotificationState(e.target.value)}

  return (
    <div>
      <FormControl className={margin}>
        <InputLabel className={label}>
          Specification
        </InputLabel>
        <NativeSelect
          value={itemSpecification}
          onChange={(e) => changeValue(e, setItemSpecification)}
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
}
