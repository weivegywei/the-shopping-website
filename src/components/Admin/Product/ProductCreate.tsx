import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { AvailabilitySwitch } from './AvailabilitySwitch';
import { SpecificationDropdown } from './SpecificationDropdown';
import { InfoEntryFramework } from '../../Utilities/InfoEntryFramework';
import { observer } from "mobx-react";
import { productStore as store, ProductStoreKeys, CategoryType} from '../../../store/productStore';
import { postData } from '../../../api/postData';
import { InputDropdown } from '../../Utilities/InputDropdown';
import styles from './ProductCreate.module.scss';
import { ChangeEvent } from 'react';

const defaultFormFields = [
    {primary: 'Product name', type: 'text', key: ProductStoreKeys.productName, error: false, errorMessage: ''},
    {primary: 'Manufacturer name', type: 'text', key: ProductStoreKeys.manufacturerName, error: false, errorMessage: ''},
    {primary: "Inventory", type: 'number', key: ProductStoreKeys.inventory, error: false, errorMessage: ''},
    {primary: "Image URL", type: 'text', key: ProductStoreKeys.imageUrl, error: false, errorMessage: ''},
    {primary: "Price", type: 'number', key: ProductStoreKeys.price, error: false, errorMessage: ''},
    {primary: 'Description', type: 'text', key: ProductStoreKeys.description, error: false, errorMessage: ''},
    {primary: 'Package size', type:'text', key: ProductStoreKeys.packageSize, error: false, errorMessage: ''}
];

export const ProductCreatePage = observer(() => {
  const {root, box, title, formField, button, specInput} = styles;
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {store.changeValue(ProductStoreKeys.specificationDescr, e.target.value)};
  const [formFields, setFormFields] = useState(defaultFormFields);

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
      if(errorField) {
        errorField.error = true;
        errorField.errorMessage = res.error.message;
        setFormFields(newFormFields);
      }
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
                <ListItemText primary='Availability' />
                <AvailabilitySwitch store={store} />
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Specification' />
                <SpecificationDropdown store={store} />
                <input type='text' className={specInput} onChange={changeValue}></input>
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Category' />
                <InputDropdown store={store} selectValue={store.category}  
                options={Object.values(CategoryType)} />
            </ListItem>
        </List>
        <Button variant="contained" className={button} disableElevation onClick={createNewProduct}>
            Create New Product
        </Button>
      </div>
    </div>
  );
})
//