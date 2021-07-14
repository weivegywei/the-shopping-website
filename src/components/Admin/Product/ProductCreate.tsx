import { useState, useContext, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { AvailabilitySwitch } from './AvailabilitySwitch';
import { SpecificationDropdown } from './SpecificationDropdown';
import { TextInput } from '../../Utilities/TextInput';
import { observer } from "mobx-react";
import { productStore as store, ProductStoreKeys, CategoryType} from '../../../store/productStore';
import { postData } from '../../../api/postData';
import { InputDropdown } from '../../Utilities/InputDropdown';
import styles from './ProductCreate.module.scss';
import { ChangeEvent } from 'react';
import { SnackbarContext } from '../../../SnackbarContext';

const defaultFormFields = [
    {primary: 'Product name', type: 'text', key: ProductStoreKeys.productName, error: false, errorMessage: ''},
    {primary: 'Manufacturer name', type: 'text', key: ProductStoreKeys.manufacturerName, error: false, errorMessage: ''},
    {primary: "Inventory", type: 'number', key: ProductStoreKeys.inventory, error: false, errorMessage: ''},
    {primary: "Image URL", type: 'text', key: ProductStoreKeys.imageUrl, error: false, errorMessage: ''},
    {primary: "Price", type: 'number', key: ProductStoreKeys.price, error: false, errorMessage: ''},
    {primary: 'Description', type: 'text', key: ProductStoreKeys.description, error: false, errorMessage: ''},
    {primary: 'Package size', type:'text', key: ProductStoreKeys.packageSize, error: false, errorMessage: ''}
];

export const ProductCreate = observer(() => {
  const {root, box, title, formField, button, specInput} = styles;
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {store.changeValue(ProductStoreKeys.specificationDescr, 
    e.target.value)};
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setOpenNotification, setSuccessMsg } = useContext(SnackbarContext);
  const {manufacturerName, price, imageUrl, availability, inventory, specification, specificationDescr, description,
    packageSize, category, productName} = store;

  const createNewProduct = async() => {
    //console.log('ever called')
    const res = await postData('/api/admin/product/create',{
      name: productName, 
      manufacturerName,
      price, 
      imageUrl, 
      availability,
      inventory,
      specification,
      specificationDescr,
      description, 
      packageSize,
      category
    });
    //console.log(res, 'res');
    if(res.error) {
      const newFormFields = [...formFields];
      const errorField = newFormFields.find((it) => it.key === res.error.field);
      if(errorField) {
        errorField.error = true;
        errorField.errorMessage = res.error.message;
        setFormFields(newFormFields);
      }
    } else if (res.status === 200) {
      setOpenNotification(true);
      setSuccessMsg('Product successfully created')
    }
  };

  const isEnabled = useCallback(() => Boolean(productName.length && manufacturerName.length && price > 0 && 
    imageUrl.length && inventory > 0 && description.length && category),[productName, manufacturerName, price, 
      imageUrl, inventory, description, category])
  
  //for test
  /* console.log(productName, manufacturerName, price, imageUrl, inventory, description, packageSize, specification,
    specificationDescr, availability, category); */

return (
    <div className={root}>
      <div className={box}>
        <Typography variant='h5' className={title}>
            New Product
        </Typography>
        <List component="nav">
            {formFields.map((item) => {
                return <TextInput store={store} item={item} data-test={`textInput-${item.key}`}
                key={`${item.key}${item.error}${item.errorMessage}`} />
                }
            )}
            <ListItem divider className={formField}>
                <ListItemText primary='Availability' />
                <AvailabilitySwitch store={store} />
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Specification' />
                <SpecificationDropdown store={store} />
                <input type='text' className={specInput} data-test={'textInput-specificationDescr'}
                onChange={changeValue}></input>
            </ListItem>
            <ListItem divider className={formField}>
                <ListItemText primary='Category' />
                <InputDropdown store={store} selectValue={store.category}  
                options={Object.values(CategoryType)} />
            </ListItem>
        </List>
        <Button variant="contained" className={button} disableElevation disabled={!isEnabled()} 
        onClick={createNewProduct}>
            Create New Product
        </Button>
      </div>
    </div>
  );
})
