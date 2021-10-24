import { Card, CardActions, CardContent, IconButton, Tooltip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { addToCart, addToGuestCart, addToWishlist } from  '../../util/helper';
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
  const { setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber, 
    wishlistItemNumber, setWishlistItemNumber } = useContext(AppContext);
  const itemFirstSpecificationValue = item.specificationDescr[0].split(',')[0];
  
  const handleClickAddToCart = async(e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (userStore.id) {
      addToCart( userStore.id, item._id, 1, itemFirstSpecificationValue );
    } else if (localStorage.guestId) {
      addToGuestCart( localStorage.guestId, item._id, 1, itemFirstSpecificationValue )
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      const resGuestCart = await addToGuestCart( generatedGuestId, item._id, 1, itemFirstSpecificationValue )
      if(resGuestCart) {
        console.log(resGuestCart, 'resGuestCart')
      }
    }
    setCartItemNumber(cartItemNumber + 1)
    setOpenNotification(true);
    setSuccessMsg('Item added to cart.')
  }

  const handleClickAddToWishlist = async(e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (userStore.id) {
      addToWishlist( userStore.id, item._id, itemFirstSpecificationValue );
    } else if (localStorage.guestId) {
      addToWishlist( localStorage.guestId, item._id, itemFirstSpecificationValue )
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      const resWishlist = await addToWishlist( generatedGuestId, item._id, itemFirstSpecificationValue )
      console.log(resWishlist, 'resWishlist')
    }
    setWishlistItemNumber(wishlistItemNumber + 1)
    setOpenNotification(true);
    setSuccessMsg('Item added to wishlist.')
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
          <StyledIconButton className={icon}  onClick={handleClickAddToWishlist} >
            <RiHeartAddLine />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title='Add to cart'>
          <IconButton className={icon} onClick={handleClickAddToCart} >
            <AddShoppingCartIcon/>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
