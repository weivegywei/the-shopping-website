import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { ChangeEvent, useContext } from 'react';
import { EditProductContext } from './EditProductContext';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './EditSpecificationDropdown.module.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 110,
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

export const EditSpecificationDropdown = () => {
  const { margin, label } = styles;
  const { itemSpecification, setItemSpecification } = useContext(EditProductContext);
  const changeValue = (e: ChangeEvent<HTMLSelectElement>, setState) => {setState(e.target.value)}

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
