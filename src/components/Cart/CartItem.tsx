import { useState, useContext, ChangeEvent } from 'react';
import cn from 'classnames';
import { Typography, IconButton, Divider } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { postData } from '../../api/postData';
import { AlertDialog } from '../Utilities/AlertDialog';
import styles from './CartItem.module.scss';
import { UserStoreType } from '../../store/userStore';
import { AppContext } from '../../AppContext'
import { addToWishlist } from '../../util/helper';

export type CartItemProductType = {
  _id: string;
  productId: string;
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
  afterDeleteHandler: () => void;
  afterChangeHandler: () => void
}

export const CartItem = ({ item, userStore, afterDeleteHandler, afterChangeHandler }: CartItemProps) => {
  const {wrapper,img, productInfo,textarea,itemInfoDiv,textColor, iconDiv, iconButton, icon, 
    iconDivider, panel,input,flexFiller,panelItem,subtotal} = styles;
  const { _id, quantity, imageUrl, name, specification, specificationValue, inventory, price } = item;
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItemProductType>();
  const { cartItemNumber, setCartItemNumber, wishlistItemNumber, setWishlistItemNumber, setNotificationInfo } = useContext(AppContext);

  const handleClickOpenAlert = (item: CartItemProductType) => {
    setOpenAlert(true);
    setSelectedItem(item);
  };

  const handleClickAddToWishlist = async(item: CartItemProductType) => {
    const { productId, specificationValue } = item
    try {
      const res = await addToWishlist(userStore.id ?? localStorage.guestId, productId, specificationValue)
      if (typeof(res.data) === 'string') {
        setNotificationInfo('info', 'Item is already in the wishlist')
      } else {
        setWishlistItemNumber(wishlistItemNumber + 1)
        setNotificationInfo('success', 'Item added to wishlist')
      }
    }
    catch (error) {
      console.log(error, 'error in adding to wishlist')
      setNotificationInfo('error', 'There is an error, please try again.')
    }
    
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return postData('/api/cart/change', {userId: userStore.id ? userStore.id : localStorage.guestId, cartItemId: _id, quantity: e.target.value})
  };
  
  const handleDelete = (item: CartItemProductType) => {
    return postData('/api/cart/delete', {userId: userStore.id ? userStore.id : localStorage.guestId, cartItemId: _id});
  }

  const itemQuantityChangeHandler = async(e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value));
    await handleChange(e);
    setCartItemNumber(cartItemNumber - quantity + Number(e.target.value));
    afterChangeHandler()
  };

  const handleConfirm = async (item: CartItemProductType) => {
    setOpenAlert(false);
    const res = await handleDelete(item);
    if (res) {
    afterDeleteHandler();
    setCartItemNumber(cartItemNumber - quantity);
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
                <Divider orientation="vertical" className={iconDivider} />
                <IconButton className={iconButton} disableFocusRipple onClick={() => handleClickAddToWishlist(item)}>
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
