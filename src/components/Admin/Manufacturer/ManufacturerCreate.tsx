import { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { InfoEntryFramework } from '../../Utilities/InfoEntryFramework';
import { observer } from "mobx-react";
import { manufacturerStore as store, manufacturerStoreType, ManufacturerStoreKeys } from '../../../store/manufacturerStore';
import { postData } from '../../../api/postData';
import styles from './ManufacturerCreate.module.scss';
import { urlValidityPattern } from '../../../const/constants';
import { SnackbarContext } from '../../../SnackbarContext';

const defaultFormFields = [
    {primary: 'Manufacturer name', type: 'text', key: ManufacturerStoreKeys.manufacturerName, error: false, errorMessage: ''},
    {primary: "Logo URL", type: 'text', key: ManufacturerStoreKeys.logoUrl, error: false, errorMessage: ''}
];

type ManufacturerCreatePageComponentProps = {
  store: manufacturerStoreType;
}

export const ManufacturerCreatePage = () => <ManufacturerCreatePageComponent store={store}/>

const ManufacturerCreatePageComponent = observer(
  ( {store}: ManufacturerCreatePageComponentProps ) => {
  const {root, box, title, button} = styles;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [disabled, setDisabled] = useState(false);
  const { setState, setOpenNotification, setErrorMsg, setSuccessMsg } = useContext(SnackbarContext);

  const createNewManufacturer = async() => {const res = await postData('/api/admin/manufacturer/create',{
    manufacturerName: store.manufacturerName,
    logoUrl: store.logoUrl
    });
    setOpenNotification(true);
    if(res.hasOwnProperty('error')) {
      setState('error');
      setErrorMsg('Error! Manufacturer adding failed');
    } else {
      setSuccessMsg('Manufacturer added successfully')
    }
    return res;
  };

  useEffect(() => {
    const pattern = urlValidityPattern; 
    const urlValidation = pattern.test(store.logoUrl);
    if (!urlValidation && store.logoUrl.length > 0) {
      const newFormFields = [...defaultFormFields];
      const errorField = newFormFields.find((it) => it.key === 'logoUrl');
      if(errorField) {
        errorField.error = true;
        errorField.errorMessage = 'Invalid Url';
        setFormFields(newFormFields);
        setDisabled(true);
      }
    } if (!!urlValidation && store.logoUrl.length > 0) {
      setDisabled(false);
      setFormFields(defaultFormFields);
    }
  }, [store.logoUrl])
  

  return (
    <>
      <div className={root}>
        <div className={box}>
          <Typography variant='h5' className={title}>
              New Manufacturer
          </Typography>
          <List component="nav">
              {formFields.map((item) => <InfoEntryFramework store={store} item={item} 
                  key={`${item.key}${item.error}${item.errorMessage}`} />)}
          </List>
          <Button variant="contained" className={button} disableElevation disabled={disabled} onClick={createNewManufacturer}>
              Create New Manufacturer
          </Button>
        </div>
      </div>
    </>
  );
})
