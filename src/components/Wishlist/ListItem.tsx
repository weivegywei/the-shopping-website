import { useState, useContext, ChangeEvent } from 'react';
import cn from 'classnames';
import { Typography, IconButton, Divider } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { postData } from '../../api/postData';
import { AlertDialog } from '../Utilities/AlertDialog';
import styles from './ListItem.module.scss';
import { UserStoreType } from '../../store/userStore';
import { AppContext } from '../../AppContext'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export type ListItemProductType = {
    _id: string;
    productId: string;
    imageUrl: string;
    name: string;
    specification: string | null;
    specificationValue: string | null;
    price: number;
  }

type ListItemProps = {
    item: ListItemProductType;
    userStore: UserStoreType;
    setListItemsAndNotificationAfterDeleteHandler: () => void
}

export const ListItem = ({item, userStore, setListItemsAndNotificationAfterDeleteHandler}: ListItemProps) => {
    const { _id, productId, imageUrl, name, specification, specificationValue, price } = item
    const { wrapper, img, productInfo, textarea, itemInfoDiv, textColor, iconDiv, iconButton, icon, flexFiller, 
        iconDivider, priceDiv, priceText } = styles
    const [ openAlert, setOpenAlert ] = useState(false)
    const [ selectedItem, setSelectedItem ] = useState<ListItemProductType>()
    const { wishlistItemNumber, setWishlistItemNumber, cartItemNumber, setCartItemNumber, 
        setOpenNotification, setSuccessMsg } = useContext(AppContext)

    const handleClickOpenAlert = (item: ListItemProductType) => {
        setOpenAlert(true);
        setSelectedItem(item);
    }

    const handleClickAddToCart = async(item: ListItemProductType) => {
        let res;
        const { productId, specificationValue } = item
        if (userStore.id) {
            res = await postData('/api/cart/add', {userId: userStore.id, productId, specificationValue, quantity: 1})
        } else if (localStorage.guestId) {
            res = await postData('/api/guestcart/add', {guestId: localStorage.guestId, productId, specificationValue, quantity: 1})
        }
        //if (res.data )
        setCartItemNumber(cartItemNumber + 1)
        setOpenNotification(true)
        setSuccessMsg('Item added to cart')
    }

    const handleDelete = async(item: ListItemProductType) => {
        let res;
        if (userStore.id) {
          res = await postData('/api/wishlist/delete', {ownerId: userStore.id, listItemId: _id})
        } else if (localStorage.guestId) {
          res = await postData('/api/wishlist/delete', {ownerId: localStorage.guestId, listItemId: _id})
        }
        return res
      }

    const handleConfirm = (item: ListItemProductType) => {
        let res = handleDelete(item);
        if (res) {
            setListItemsAndNotificationAfterDeleteHandler();
            setWishlistItemNumber(wishlistItemNumber - 1);
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
                        <Divider orientation="vertical" className={iconDivider} />
                        <IconButton className={iconButton} disableFocusRipple onClick={() => handleClickAddToCart(item)}>
                            <AddShoppingCartIcon className={icon} />
                            Add to cart
                        </IconButton>
                    </Typography>
                </div>
                <div className={flexFiller} />
                <div className={priceDiv}>
                    <Typography variant='body2' className={priceText}>
                        € {Number(price)}
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