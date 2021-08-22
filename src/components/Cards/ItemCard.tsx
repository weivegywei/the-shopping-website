import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { addToCart } from  '../../util/helper';
import { getCartItemsNumber } from '../../App.util'
import styles from './ItemCard.module.scss';
import { UserStoreType } from '../../store/userStore';
import { MouseEvent, useContext } from 'react';
import { AppContext } from '../../AppContext';

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

export const ItemCard = ({item, userStore}: ItemCardProps) => {
  const {root, p, card, action, flexfiller, icon} = styles;
  const { setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber } = useContext(AppContext);
  
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(userStore.id, item._id, 1, item.specificationDescr[0].split(',')[0]); //choose the first specification 
    //value to add to cart
    setCartItemNumber(cartItemNumber + 1)
    setOpenNotification(true);
    setSuccessMsg('Item added to cart.')
  }

  return (
    <Card className={root} variant="outlined">
      <CardContent className={card}>
        <img src={item.imageUrl} alt='' width="130" height="150" />
        <div className={p}>{item.name}</div>
      </CardContent>
      <CardActions className={action}>
      <div className={p}>€ {Number(item.price).toFixed(2)}</div>
      <div className={flexfiller}></div>
        <IconButton className={icon} onClick={handleClick}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
