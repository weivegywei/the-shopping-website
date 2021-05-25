import React, {useState} from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Divider from '@material-ui/core/Divider';
import { postData } from '../../api/postData';
import { AlertDialog } from '../Utilities/AlertDialog';

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        alignItems: 'top',
        width: '100%',
    },
    productInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    textarea: {
        margin: '5px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center'
    },
    itemInfoDiv: {
        display: 'flex',
        width: '100%',
        fontSize: '14px',
        textTransform: 'capitalize'
    },
    iconDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: {
        fontSize: '0.75rem!important',
        padding: 10,
        paddingLeft: 5,
        height: 30,
        borderRadius: 0,
        '&:hover': {
            background: 'unset'
        }
    },
    icon: {
        fontSize: '1rem',
        padding: 5
    },
    divider: {
        height: 20,
        width: 1
    },
    panel: {
        minWidth: '150px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'start',
        flexDirection: 'column',
        fontSize: '15px'
    },
    panelItem: {
        alignItems: 'flex-end',
        margin: '5px 0',
    },
    subtotal: {
        fontWeight: 'bold'
    },
    amountDiv: {
        width: '180px'
    },
    quantityDiv: {
        width: '100px'
    },
    input: {
        width: '60px',
        height: '30px',
        fontSize: '15px',
        padding: '2px 10px',
        '&:focus':{
            outline: 'none'
        }
    },
    flexFiller: {
        flex: '1'
    },
    textColor: {
        color: 'grey'
    }
  }));

export const CartItem = ({item, userStore, setCartItemsAndNotificationHandler}) => {
    console.log('asdas', item);
  const {wrapper,productInfo,textarea,itemInfoDiv,textColor, iconDiv, iconButton, icon, 
    divider, panel,input,flexFiller,panelItem,subtotal} = useStyles();
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const handleDelete = async(item) => await postData('/api/cart/delete', {userId: userStore.id, cartItemId: item._id});
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const handleClickOpen = (item) => {
    setOpenAlert(true);
    setSelectedItem(item);
  };
  const handleChange = async(e) => {
      await postData('/api/cart/change', {userId: userStore.id, cartItemId: item._id,
    quantity: e.target.value})};
  const itemQuantityChangeHandler = (e) => {
      setItemQuantity(e.target.value);
      handleChange(e);
  };

  return (  
    <>
      <div className={wrapper}>
        <img src={item.imageUrl} alt='' width='104px' height='120px'/>
        <div className={productInfo} >
        <Typography variant='body1'>
            <div  className={textarea}>
                <div className={itemInfoDiv}>{item.name}</div>
                <div className={cn(itemInfoDiv, textColor)}>{item.specification}: {item.specificationValue}</div>
            </div>
            </Typography>
            <div className={flexFiller} />
                <Typography variant='caption' className={iconDiv}>
                <IconButton className={iconButton} onClick={() => handleClickOpen(item)} >
                    <DeleteOutlineOutlinedIcon className={icon} />
                    Delete
                </IconButton>
                <Divider orientation="vertical" className={divider} />
                <IconButton className={iconButton} >
                    <FavoriteBorderOutlinedIcon className={icon} />
                    Add to wishlist
                </IconButton>
                </Typography>
        </div>
        <div className={flexFiller} />
        <div className={panel}>
            <input type='number' className={cn(panelItem,input)} min='1' max={`${item.inventory}`} 
                value={itemQuantity} onChange={(e)=> itemQuantityChangeHandler(e)}></input>
            <div className={flexFiller}/>
            <Typography variant='body2' className={cn(panelItem, subtotal)}>
                € {(itemQuantity * Number(item.price)).toFixed(2)}
            </Typography>
        </div>
      </div>
      {openAlert && 
      <AlertDialog
        open={openAlert} 
        handleClose={() => setOpenAlert(false)} 
        handleConfirm={() => handleDelete(selectedItem) && setCartItemsAndNotificationHandler() && setOpenAlert(false)}
        alertMsg = 'Are you sure you want to delete this item?'
        confirmMsg = 'Delete'
      />}
    </>
  )
}