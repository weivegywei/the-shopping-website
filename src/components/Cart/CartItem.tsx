import { useState, useContext } from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Divider from '@material-ui/core/Divider';
import { postData } from '../../api/postData';
import { AlertDialog } from '../Utilities/AlertDialog';
import styles from './CartItem.module.scss';
import { ChangeEvent } from 'react';
import { UserStoreType } from '../../store/userStore';
import { AppContext } from '../../AppContext'

export type CartItemProductType = {
  _id: string;
  quantity: number;
  imageUrl: string;
  name: string;
  specification: string | null;
  specificationValue: string | null;
  inventory: number;
  price: number;
}

type CartItemProps = {
  item: CartItemProductType;
  userStore?: UserStoreType;
  setCartItemsAndNotificationAfterDeleteHandler: () => void;
  setCartItemsAndNotificationAfterChangeHandler: () => void
}

export const CartItem = ({
  item, userStore, setCartItemsAndNotificationAfterDeleteHandler, setCartItemsAndNotificationAfterChangeHandler
}: CartItemProps) => {
  const {wrapper,img, productInfo,textarea,itemInfoDiv,textColor, iconDiv, iconButton, icon, 
    divider, panel,input,flexFiller,panelItem,subtotal} = styles;
  const { _id, quantity, imageUrl, name, specification, specificationValue, inventory, price } = item;
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItemProductType>();
  const { cartItemNumber, setCartItemNumber } = useContext(AppContext);

  const handleClickOpenAlert = (item: CartItemProductType) => {
    setOpenAlert(true);
    setSelectedItem(item);
  };

  const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
    if (userStore.id) {
      await postData('/api/cart/change', {userId: userStore.id, cartItemId: _id, quantity: e.target.value})
    } else if (localStorage.guestId) {
      await postData('/api/guestcart/change', {guestId: localStorage.guestId, cartItemId: _id, quantity: e.target.value})
    }
  };
  
  const handleDelete = async(item: CartItemProductType) => {
    let res;
    if (userStore.id) {
      res = await postData('/api/cart/delete', {userId: userStore.id, cartItemId: _id})
    } else if (localStorage.guestId) {
      res = await postData('/api/guestcart/delete', {guestId: localStorage.guestId, cartItemId: _id})
    }
    return res
  }

  const itemQuantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setItemQuantity(Number(e.target.value));
      handleChange(e);
      setCartItemNumber(cartItemNumber - quantity + Number(e.target.value));
      setCartItemsAndNotificationAfterChangeHandler()
  };

  const handleConfirm = (item: CartItemProductType) => {
    let res = handleDelete(item);
    if (res) {
      setCartItemsAndNotificationAfterDeleteHandler();
      setCartItemNumber(cartItemNumber - quantity);
      setOpenAlert(false);
    }
  }

  return (  
    <>
      <div className={wrapper}>
        <img src={imageUrl} alt='' width='104px' height='120px' className={img}/>
        <div className={productInfo} >
            <Typography variant='body1'>
            <div  className={textarea}>
                <div className={itemInfoDiv}>{name}</div>
                <div className={cn(itemInfoDiv, textColor)}>
                  {specification && specificationValue ? 
                  specification + ': ' + specificationValue :
                  null}
                </div>
            </div>
            </Typography>
            <div className={flexFiller} />
            <Typography variant='caption' className={iconDiv}>
                <IconButton className={iconButton} onClick={() => handleClickOpenAlert(item)} >
                    <DeleteOutlineOutlinedIcon className={icon} />
                    Delete
                </IconButton>
                <Divider orientation="vertical" className={divider} />
                <IconButton className={iconButton} disableFocusRipple >
                    <FavoriteBorderOutlinedIcon className={icon} />
                    Add to wishlist
                </IconButton>
            </Typography>
        </div>
        <div className={flexFiller} />
        <div className={panel}>
            <input type='number' className={cn(panelItem,input)} min='1' max={`${inventory}`} 
                value={itemQuantity} onChange={(e)=> itemQuantityChangeHandler(e)}></input>
            <div className={flexFiller}/>
            <Typography variant='body2' className={cn(panelItem, subtotal)}>
                € {(itemQuantity * Number(price)).toFixed(2)}
            </Typography>
        </div>
      </div>
      {openAlert && 
      <AlertDialog
        open={openAlert} 
        handleClose={() => setOpenAlert(false)} 
        handleConfirm={() => handleConfirm(selectedItem)}
        alertMsg = 'Are you sure you want to delete this item?'
        confirmMsg = 'Delete'
      />}
    </>
  )
}
