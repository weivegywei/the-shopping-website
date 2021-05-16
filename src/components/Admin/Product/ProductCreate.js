import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {AvailabilitySwitch} from './AvailabilitySwitch';
import {SpecificationDropdown} from './SpecificationDropdown';
import { InfoEntryFramework } from '../../Utilities/InfoEntryFramework';
import { observer } from "mobx-react";
import { productStore as store } from '../../../store/productStore';
import { postData } from '../../../api/postData';
import { InputDropdown } from '../../Utilities/InputDropdown';
import { productCategory } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#fcfcf0',
    height: '100vh',
    justifyContent: 'center',
    '& > *': {
        width: theme.spacing(62),
      }
  },
  box: {
      display: 'flex',
      background: '#fcfcf0',
      height: '100vh',
      justifyContent: 'center', 
      flexDirection: 'column'   
  },
  title: {
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formField: {
    height: '60px',
  },
  button: {
    background: 'black',
    color: 'white'
  },
  specInput: {
    height: '35px',
    width: '225px',
    border: 'none',
    fontSize: '15px',
    '&:focus': {
        outline: 'none',
    }
  }
}));

const defaultFormFields = [
    {primary: 'Product name: ', type: 'text', key: 'productName', error: false},
    {primary: 'Manufacturer name: ', type: 'text', key: 'manufacturerName', error: false},
    {primary: "Inventory: ", type: 'number', key: 'inventory', error: false},
    {primary: "Image URL: ", type: 'text', key: 'imageUrl', error: false},
    {primary: "Price: ", type: 'number', key: 'price', error: false},
    {primary: 'Description: ', type: 'text', key: 'description', error: false},
    {primary: 'Package size: ', type:'text', key: 'packageSize', error: false}
];

export const ProductCreatePage = observer(() => {
  const {root, box, title, formField, button, specInput} = useStyles();
  const changeValue = (e) => {store.changeValue('specificationDescr', e.target.value)};
  const [formFields, setFormFields] = useState(defaultFormFields);
  const categoryOptions = productCategory;

const createNewProduct = async() => {
    const {manufacturerName, price} = store;
    const res = await postData('/api/admin/product/create',{
      name: store.productName, 
      manufacturerName,
      price, 
      imageUrl: store.imageUrl, 
      availability: store.availability,
      inventory: store.inventory,
      specification: store.specification,
      specificationDescr: store.specificationDescr,
      description: store.description, 
      packageSize: store.packageSize,
      category: store.category
    });
    if(res.error) {
      const newFormFields = [...formFields];
      const errorField = newFormFields.find((it) => it.key === res.error.field);
      errorField.error = true;
      errorField.errorMessage = res.error.message;
      setFormFields(newFormFields);
    }
};

  return (
    <div className={root}>
      <div className={box}>
        <Typography variant='h5' className={title}>
            New Product
        </Typography>
        <List component="nav">
            {formFields.map((item) => 
                <InfoEntryFramework store={store} item={item} key={`${item.key}${item.error}${item.errorMessage}`} />
            )}
            <ListItem divider className={formField}>
                <ListItemText primary='Availability: ' />
                <AvailabilitySwitch store={store} />
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Specification: ' />
                <SpecificationDropdown store={store} />
                <input type='text' className={specInput} onChange={(e) => changeValue(e)}></input>
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Category: ' />
                <InputDropdown store={store} fieldName='category' selectValue={store.category}  
                options={categoryOptions} />
            </ListItem>
        </List>
        <Button variant="contained" className={button} disableElevation onClick={createNewProduct}>
            Create New Product
        </Button>
      </div>
    </div>
  );
})
