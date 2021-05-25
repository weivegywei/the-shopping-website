import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { postData } from '../../api/postData';
import { getCartItemsNumber } from '../../App.util';

const useStyles = makeStyles({
  root: {
    minWidth: '100px',
    Height: '260px',
    border: 'none'
  },
  card: {
    minHeight: '210px',
    padding: '16px 16px 8px 16px'
  },
  action: {
    padding: '8px 12px 4px 12px'
  },
  p: {
    margin: '0', 
    maxHeight: '20px',
    textOverflow: 'ellipsis',
    color: '#494f4d',
    fontSize: 15
  },
  flexfiller: {
    flex: '1'
  }, 
  icon: {
    background: '#8ba48a',
    color: '#f5f5f5',
    fontSize: 'small',
    borderRadius: '5px',
    width: '35px',
    height: '35px',
    '&:hover': {
      background: '#506e69'
    }
  }
});

export function ItemCard({item, userStore, setOpenNotification}) {
  const {root,p, card, action, flexfiller, icon} = useStyles();
  const userId = userStore.id;
  const productId = item._id;
  const specificationValue = item.specificationDescr[0].split(',')[0];
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart();
    setOpenNotification(true);
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
        <IconButton className={icon} onClick={(e) => handleClick(e)}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
