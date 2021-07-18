import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { postData } from '../../api/postData';
import { getCartItemsNumber } from '../../App.util';
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
  const userId = userStore.id;
  const productId = item._id;
  const specificationValue = item.specificationDescr[0].split(',')[0];
  const { setOpenNotification, setSuccessMsg } = useContext(AppContext);
  
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart();
    setOpenNotification(true);
    setSuccessMsg('Item added to cart.')
  }
  const addToCart = async() => {
    const updatedCart = await postData('/api/cart', {
      userId, productId, quantity: 1, specificationValue});
      getCartItemsNumber(userStore.id);
    return updatedCart;
  }

  return (
    <Card className={root} variant="outlined">
      <CardContent className={card}>
        <img src={item.imageUrl} alt='' width="130" height="150" />
        <div className={p}>{item.name}</div>
      </CardContent>
      <CardActions className={action}>
      <div className={p}>€ {item.price}</div>
      <div className={flexfiller}></div>
        <IconButton className={icon} onClick={handleClick}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
