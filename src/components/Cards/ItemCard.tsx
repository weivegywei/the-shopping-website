import { Card, CardActions, CardContent, IconButton, Tooltip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { addToCart, addToWishlist } from  '../../util/helper';
import styles from './ItemCard.module.scss';
import { UserStoreType } from '../../store/userStore';
import { MouseEvent, useContext } from 'react';
import { AppContext } from '../../AppContext';
import { v4 as uuidv4 } from 'uuid';
import { RiHeartAddLine } from 'react-icons/ri';

type ItemCardItemType = {
  _id: string;
  specificationDescr: string[];
  imageUrl: string;
  name: string;
  price: number
};

type ItemCardProps = {
  item: ItemCardItemType;
  userStore: UserStoreType;
};

const StyledIconButton = withStyles({
  root: {
    padding: 0
  }
})(IconButton)

export const ItemCard = ({item, userStore}: ItemCardProps) => {
  const {root, p, card, action, flexfiller, icon} = styles;
  const { setOpenNotification, setSnackbarMsg, cartItemNumber, setCartItemNumber, setNotificationState,
    wishlistItemNumber, setWishlistItemNumber } = useContext(AppContext);
  const itemFirstSpecificationValue = item.specificationDescr[0].split(',')[0];
  
  const handleClickAddToCart = async(e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    let resCart;
    if (userStore.id || localStorage.guestId) {
      resCart = await addToCart( userStore.id ?? localStorage.guestId, item._id, 1, itemFirstSpecificationValue );
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      resCart = await addToCart( generatedGuestId, item._id, 1, itemFirstSpecificationValue )
    }
    if(resCart) {
      setCartItemNumber(cartItemNumber + 1)
      setNotificationState('success')
      setSnackbarMsg('Item added to cart.')
    } else {
      setNotificationState('error')
      setSnackbarMsg('Adding item failed, please try again.')
    }
    setOpenNotification(true);
  }

  const handleClickAddToWishlist = async(e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    let res;
    try {
      if (userStore.id || localStorage.guestId) {
        res = await addToWishlist(userStore.id ?? localStorage.guestId, item._id, itemFirstSpecificationValue)
      } else {
        const generatedGuestId = uuidv4();
        localStorage.setItem('guestId', generatedGuestId);
        res = await addToWishlist( generatedGuestId, item._id, itemFirstSpecificationValue )
      }
      if (typeof(res.data) === 'string') {
        setNotificationState('info')
        setSnackbarMsg('Item is already in the wishlist')
      } else {
        setWishlistItemNumber(wishlistItemNumber + 1)
        setNotificationState('success')
        setSnackbarMsg('Item added to wishlist')
      }
    }
    catch (error) {
      console.log(error, 'error in adding to wishlist')
      setNotificationState('error')
      setSnackbarMsg('There is an error, please try again.')
    }
    setOpenNotification(true)
  }

  return (
    <Card className={root} variant="outlined" >
      <CardContent className={card}>
        <img src={item.imageUrl} alt='' width="130" height="150" />
        <div className={p}>{item.name}</div>
      </CardContent>
      <CardActions className={action}>
        <div className={p}>€ {Number(item.price).toFixed(2)}</div>
        <div className={flexfiller}></div>
        <Tooltip title='Add to wish list'>
          <StyledIconButton className={icon}  onClick={handleClickAddToWishlist} data-test='itemCard-addToWishlistButton'>
            <RiHeartAddLine />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title='Add to cart'>
          <IconButton className={icon} onClick={handleClickAddToCart} data-test='itemCard-addToCartButton'>
            <AddShoppingCartIcon/>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
