import { useState, useContext } from 'react';
import cn from 'classnames';
import { Typography, IconButton, Divider } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { postData } from '../../api/postData';
import { AlertDialog } from '../Utilities/AlertDialog';
import styles from './WishlistItem.module.scss';
import { UserStoreType } from '../../store/userStore';
import { AppContext } from '../../AppContext'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export type WishlistItemProductType = {
    _id: string;
    productId: string;
    imageUrl: string;
    name: string;
    specification: string | null;
    specificationValue: string | null;
    price: number;
  }

type WishlistItemProps = {
    item: WishlistItemProductType;
    userStore: UserStoreType;
    setWishlistItemsAndNotificationAfterDeleteHandler: () => void
}

export const WishlistItem = ({item, userStore, setWishlistItemsAndNotificationAfterDeleteHandler}: WishlistItemProps) => {
    const { _id, productId, imageUrl, name, specification, specificationValue, price } = item
    const { wrapper, img, productInfo, textarea, itemInfoDiv, textColor, iconDiv, iconButton, icon, flexFiller, 
        iconDivider, priceDiv, priceText } = styles
    const [ openAlert, setOpenAlert ] = useState(false)
    const [ selectedItem, setSelectedItem ] = useState<WishlistItemProductType>()
    const { wishlistItemNumber, setWishlistItemNumber, cartItemNumber, setCartItemNumber, setNotificationState,
        setOpenNotification, setSnackbarMsg } = useContext(AppContext)

    const handleClickOpenAlert = (item: WishlistItemProductType) => {
        setOpenAlert(true);
        setSelectedItem(item);
    }

    const handleClickAddToCart = async(item: WishlistItemProductType) => {
        const { productId, specificationValue } = item;
        await postData('/api/cart/add', {userId: userStore.id ?? localStorage.guestId, productId, specificationValue, quantity: 1})
        setCartItemNumber(cartItemNumber + 1)
        setNotificationState('success')
        setOpenNotification(true)
        setSnackbarMsg('Item added to cart')
    }

    const handleDelete = async(item: WishlistItemProductType) => {
        return await postData('/api/wishlist/delete', {ownerId: userStore.id ?? localStorage.guestId, wishlistItemId: _id})
    }

    const handleConfirm = (item: WishlistItemProductType) => {
        const res = handleDelete(item);
        if (res) {
            setWishlistItemsAndNotificationAfterDeleteHandler();
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
                                specification + ': ' + specificationValue : null}
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
