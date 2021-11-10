import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { BootstrapInput } from '../../../../util/BootstrapInput';
import { ChangeEvent } from 'react';
import styles from './EditSpecificationDropdown.module.scss';
import { SpecificationType } from '../../../../store/productStore'

type EditSpecificationDropdownProps = {
  itemSpecification: SpecificationType;
  setItemSpecification: (a: SpecificationType) => void
}

export const EditSpecificationDropdown = ({itemSpecification, setItemSpecification}: EditSpecificationDropdownProps) => {
  const { margin, label } = styles;
  const onChange=(e: ChangeEvent<HTMLSelectElement>) => {setItemSpecification(e.target.value as SpecificationType)}

  return (
    <div>
      <FormControl className={margin}>
        <InputLabel className={label}>
          Specification
        </InputLabel>
        <Select
          value={itemSpecification}
          onChange={onChange}
          input={<BootstrapInput />}
          defaultValue={'type'}
        >
          <MenuItem value=''> </MenuItem>
          <MenuItem value='type'>type</MenuItem>
          <MenuItem value='volume'>volume</MenuItem>
          <MenuItem value='size'>size</MenuItem>
          <MenuItem value='color'>color</MenuItem>
          <MenuItem value='flavor'>flavor</MenuItem>
          <MenuItem value='aroma'>aroma</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
