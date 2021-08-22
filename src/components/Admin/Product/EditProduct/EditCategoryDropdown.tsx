import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BootstrapInput } from '../../../../util/BootstrapInput';
import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './EditCategoryDropdown.module.scss';

export const EditCategoryDropdown = () => {
  const { margin, label } = styles;
  const { itemCategory, setItemCategory } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLSelectElement>, setNotificationState) => {setNotificationState(e.target.value)}

  return (
    <div>
      <FormControl className={margin}>
        <InputLabel className={label}>
          Category
        </InputLabel>
        <NativeSelect
          value={itemCategory}
          onChange={(e) => changeValue(e, setItemCategory)}
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
