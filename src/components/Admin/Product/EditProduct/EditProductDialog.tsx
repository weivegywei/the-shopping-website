import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { CategoryType, SpecificationType } from '../../../../store/productStore';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { EditSpecificationDropdown } from './EditSpecificationDropdown';
import { EditAvailabilitySwitch } from './EditAvailabilitySwitch';
import { EditCategoryDropdown } from './EditCategoryDropdown';
import styles from './EditProductDialog.module.scss';
import { postData } from '../../../../api/postData';
import { AppContext } from '../../../../AppContext';

type ManufacturerInfoType = {
    logoUrl: string;
    name: string;
    _id: string;
  }

export type ProductListItem = {
    _id: string;
    specificationDescr: string[];
    name: string;
    manufacturerId: string;
    manufacturerInfo: ManufacturerInfoType;
    price: number;
    imageUrl: string;
    inventory: number;
    description: string;
    packageSize: string;
    availability: boolean;
    specification: SpecificationType;
    category: CategoryType
  }

type EditProductDialogProps = {
    open: boolean;
    item: ProductListItem;
    handleClose: () => void;
}

export const EditProductDialog = ({open, item, handleClose}: EditProductDialogProps) => {
    const {content, form, textField, flexField, inventoryField, priceField} = styles;
    const [editError, setEditError] = useState(false);
    const [editErrorMsg, setEditErrorMsg] = useState('');
    const [productName, setProductName] = useState<string>('');
    const [manufacturer, setManufacturer] = useState<string>('');
    const [itemInventory, setItemInventory] = useState<number>(1);
    const [itemPrice, setItemPrice] = useState<number>(1);
    const [itemSpecificationDescr, setItemSpecificationDescr] = useState<string[]>([]);
    const [itemPackageSize, setItemPackageSize] = useState<string>('1*1*1');
    const [itemImageUrl, setItemImageUrl] = useState<string>('');
    const [itemDescription, setItemDescription] = useState<string>('');
    const [itemAvailability, setItemAvailability] = useState<boolean>(true);
    const [itemSpecification, setItemSpecification] = useState<SpecificationType>(SpecificationType.none);
    const [itemCategory, setItemCategory] = useState<CategoryType>(CategoryType.skinCare);
    const { setNotificationInfo } = useContext(AppContext);

    const { _id, name, manufacturerInfo, price, imageUrl, inventory, description, packageSize, availability, 
      specification, specificationDescr, category } = item;

    const changeValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setState: (e) => void) => {
      setState(e.target.value)
    };

    const handleSave = async() => {
      const res = await postData('/api/admin/product/edit', {_id, name: productName, manufacturerName: manufacturer, inventory:
        itemInventory, price: itemPrice, specification: itemSpecification, specificationDescr: itemSpecificationDescr, 
        availability: itemAvailability, imageUrl: itemImageUrl, description: itemDescription, packageSize: 
        itemPackageSize, category: itemCategory});
      if (!res.error) {
        setNotificationInfo('success', res.data)
        handleClose();
      } else if (res.error) {
        setEditError(true);
        setEditErrorMsg(res.error.message);
      }
    };
    //TODO: change EditProductContext to useState
    useEffect(() => {
      setProductName(name);
      setManufacturer(manufacturerInfo[0].name);
      setItemInventory(inventory);
      setItemPrice(price);
      setItemSpecificationDescr(specificationDescr);
      setItemPackageSize(packageSize);
      setItemImageUrl(imageUrl);
      setItemDescription(description);
      setItemCategory(category);
      setItemSpecification(specification);
      setItemAvailability(availability);
      },[]);

return (
    <Dialog open={open} fullWidth maxWidth="md" >
        <DialogContent className={content}>
          <FormControl className={form}>
            <TextField className={textField}
              margin="dense" label='Product name' value={productName} onChange={(e) => changeValue(e, setProductName)}
            />
            <TextField className={textField} error={editError}
              margin="dense" label='Manufacturer name' value={manufacturer} helperText={editErrorMsg}
              onChange={(e) => {
                setEditError(false);
                setEditErrorMsg('');
                changeValue(e, setManufacturer)}}/>
            <div className={flexField}>
              <TextField className={inventoryField}
                margin="dense" label='Inventory' type='number' value={itemInventory} 
                InputProps={{ inputProps: { min: 1, max: 9999 } }} onChange={(e) => changeValue(e, setItemInventory)}/>
              <TextField className={priceField}
                margin="dense" label='Price' type='number' value={itemPrice} 
                InputProps={{ inputProps: { min: 0.01, max: 9999.99 } }} onChange={(e) => changeValue(e, setItemPrice)}/>
            </div>
            <TextField className={textField}
              margin="dense" label='Image Url' value={itemImageUrl} 
              onChange={(e) => changeValue(e, setItemImageUrl)}/>
            <TextField className={textField}
              margin="dense" label='Description' value={itemDescription} 
              onChange={(e) => changeValue(e, setItemDescription)}/>
            <TextField className={textField}
              margin="dense" label='Package size' value={itemPackageSize} 
              onChange={(e) => changeValue(e, setItemPackageSize)}/>
            <TextField className={textField}
              margin="dense" label='Specification description' value={itemSpecificationDescr} 
              onChange={(e) => changeValue(e, setItemSpecificationDescr)}/>
            <div className={flexField}>
              <EditSpecificationDropdown itemSpecification={itemSpecification} setItemSpecification={setItemSpecification} />
              <EditCategoryDropdown itemCategory={itemCategory} setItemCategory={setItemCategory} />
              <EditAvailabilitySwitch itemAvailability={itemAvailability} setItemAvailability={setItemAvailability} />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
            Save
            </Button>
        </DialogActions>
    </Dialog>
)}
