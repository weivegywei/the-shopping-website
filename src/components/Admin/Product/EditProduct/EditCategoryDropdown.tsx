import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInput } from '../../../../util/BootstrapInput';
import { ChangeEvent } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './EditCategoryDropdown.module.scss';
import { CategoryType } from '../../../../store/productStore'

type EditCategoryDropdownProps = {
  itemCategory: CategoryType;
  setItemCategory: (a: CategoryType) => void
}

export const EditCategoryDropdown = ({itemCategory, setItemCategory}: EditCategoryDropdownProps) => {
  const { margin, label } = styles;
  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {setItemCategory(e.target.value as CategoryType)}

  return (
    <div>
      <FormControl className={margin}>
        <InputLabel className={label}>
          Category
        </InputLabel>
        <NativeSelect
          value={itemCategory}
          onChange={changeValue}
          input={<BootstrapInput />}
        >
          <option value='skin care'>skin care</option>          
          <option value='garments'>garments</option>
          <option value='electric appliances'>electric appliances</option>
          <option value='fitness'>fitness</option>
          <option value='footwears'>footwears</option>
          <option value='perfumes & fragrances'>perfumes & fragrances</option>
          <option value='personal protective equipment'>personal protective equipment</option>
          <option value='cosmetics'>cosmetics</option>
          <option value='kitchenware'>kitchenware</option>
          <option value='beddings'>beddings</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
