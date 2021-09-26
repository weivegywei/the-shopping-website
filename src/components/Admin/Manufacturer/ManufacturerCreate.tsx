import { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { TextInput } from '../../Utilities/TextInput';
import { observer } from "mobx-react";
import { manufacturerStore as store, manufacturerStoreType, ManufacturerStoreKeys } from '../../../store/manufacturerStore';
import { postData } from '../../../api/postData';
import styles from './ManufacturerCreate.module.scss';
import { urlValidityPattern } from '../../../const/constants';
import { AppContext } from '../../../AppContext';

type ManufacturerCreateComponentProps = {
  store: manufacturerStoreType;
}

export const ManufacturerCreate = () => <ManufacturerCreateComponent store={store}/>

export const ManufacturerCreateComponent = observer(
  ( {store}: ManufacturerCreateComponentProps ) => {
  const {root, box, title, button} = styles;
  const [errorMessage, setErrorMessage] = useState<string>();
  const [disabled, setDisabled] = useState(true);
  const { setNotificationState, setOpenNotification, setErrorMsg, setSuccessMsg } = useContext(AppContext);

  const createNewManufacturer = async() => {const res = await postData('/api/admin/manufacturer/create',{
    manufacturerName: store.manufacturerName,
    logoUrl: store.logoUrl
    });
    setOpenNotification(true);
    if(res.hasOwnProperty('error')) {
      setNotificationState('error');
      setErrorMsg('Error! Manufacturer adding failed');
    } else {
      setSuccessMsg('Manufacturer added successfully')
    }
    return res;
  };

  useEffect(() => {
    const urlValidation = urlValidityPattern.test(store.logoUrl); //output boolean value
    if (urlValidation) {
      setDisabled(false);
    } else if (!urlValidation && store.logoUrl.length) {
      setErrorMessage('Invalid Url');
        setDisabled(true);
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
              <TextInput inputLabel={'Manufacturer name'} type={'text'} changeValue={(e) => 
                store.changeValue(ManufacturerStoreKeys.manufacturerName, e.target.value)} />
              <TextInput inputLabel={'Logo URL'} type={'text'} errorMessage={errorMessage}
                changeValue={(e) => store.changeValue(ManufacturerStoreKeys.logoUrl, e.target.value)} />
          </List>
          <Button variant="contained" className={button} disableElevation disabled={disabled} onClick={createNewManufacturer}>
              Create New Manufacturer
          </Button>
        </div>
      </div>
    </>
  );
})

