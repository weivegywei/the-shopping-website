import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { InfoEntryFramework } from '../../Utilities/InfoEntryFramework';
import { observer } from "mobx-react";
import { manufacturerStore as store } from '../../../store/manufacturerStore';
import { postData } from '../../../api/postData';
import { NotificationSnackbar } from '../../Utilities/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ecebeb',
    height: '100vh',
    justifyContent: 'center',
    '& > *': {
        width: theme.spacing(62),
      }
  },
  box: {
      display: 'flex',
      background: '#ecebeb',
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
  button: {
    background: 'black',
    color: '#f5f5f5'
  }
}));

const defaultFormFields = [
    {primary: 'Manufacturer name: ', type: 'text', key: 'manufacturerName', error: false, errorMessage: ''},
    {primary: "Logo URL: ", type: 'text', key: 'logoUrl', error: false, errorMessage: ''}
];

export const ManufacturerCreatePage = () => <ManufacturerCreatePageComponent store={store}/>

const ManufacturerCreatePageComponent = observer(({store}) => {
  const {root, box, title, button} = useStyles();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [disabled, setDisabled] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const errorMsg = 'Error! Manufacturer adding failed';
  const successMsg = 'Manufacturer added successfully!';

  const createNewManufacturer = async() => {const res = await postData('/api/admin/manufacturer/create',{
    manufacturerName: store.manufacturerName,
    logoUrl: store.logoUrl
    });
    setOpenNotification(true);
    if(res.hasOwnProperty('error')) {
      setErrorState(true);
    }
    return res;
  };

  useEffect(() => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    const urlValidation = pattern.test(store.logoUrl);
    if (!!!urlValidation && store.logoUrl.length > 0) {
      const newFormFields = [...defaultFormFields];
      const errorField = newFormFields.find((it) => it.key === 'logoUrl');
      errorField.error = true;
      errorField.errorMessage = 'Invalid Url';
      setFormFields(newFormFields);
      setDisabled(true);
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
      {openNotification && <NotificationSnackbar state={errorState ? 'error' : 'success'} openNotification={openNotification} 
        setOpenNotification={setOpenNotification} errorMsg={errorMsg} successMsg={successMsg}/>}
    </>
  );
})
