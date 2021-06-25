import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './EditCategoryDropdown.module.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 150,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const EditCategoryDropdown = () => {
  const { margin, label } = styles;
  const { itemCategory, setItemCategory } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLSelectElement>, setState) => {setState(e.target.value)}

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
