import { makeStyles, FormControl, Select, MenuItem } from '@material-ui/core';
import { BootstrapInputForSpecificationValueDropdown } from '../../util/BootstrapInput';
import { ChangeEvent, useContext } from 'react';
import { AppContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  }
}));

type SpecificationValueDropdownProps = {
    values: string ;
}

export const SpecificationValueDropdown = 
  ({values}: SpecificationValueDropdownProps) => {
  const { margin } = useStyles();
  const { itemSpecificationValue, setItemSpecificationValue } = useContext(AppContext)
  const specificationValueArr = values.split(',');
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => setItemSpecificationValue(e.target.value)

  return (
    <div>
      <FormControl className={margin}>
        <Select
          value={itemSpecificationValue}
          onChange={onChange}
          input={<BootstrapInputForSpecificationValueDropdown />}
          defaultValue={specificationValueArr[0]}
        >
          {specificationValueArr.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
