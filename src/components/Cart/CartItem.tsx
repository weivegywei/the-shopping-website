import {useState} from 'react';
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
  userStore: UserStoreType;
  setCartItemsAndNotificationHandler: () => void;
}

export const CartItem = ({item, userStore, setCartItemsAndNotificationHandler}: CartItemProps) => {
  const {wrapper,productInfo,textarea,itemInfoDiv,textColor, iconDiv, iconButton, icon, 
    divider, panel,input,flexFiller,panelItem,subtotal} = styles;
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const handleDelete = async(item: CartItemProductType) => await postData('/api/cart/delete', {userId: userStore.id, cartItemId: item._id});
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItemProductType>();
  const handleClickOpen = (item: CartItemProductType) => {
    setOpenAlert(true);
    setSelectedItem(item);
  };
  const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
      await postData('/api/cart/change', {userId: userStore.id, cartItemId: item._id,
    quantity: e.target.value})};
  const itemQuantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setItemQuantity(Number(e.target.value));
      handleChange(e);
  };
  const handleConfirm = (selectedItem: CartItemProductType) => {
    handleDelete(selectedItem);
    setCartItemsAndNotificationHandler();
    setOpenAlert(false);
  }

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
        handleConfirm={handleConfirm}
        alertMsg = 'Are you sure you want to delete this item?'
        confirmMsg = 'Delete'
      />}
    </>
  )
}