import { useEffect, useState, useContext } from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CartItem } from './CartItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { postData } from '../../api/postData';
import { observer } from 'mobx-react';
import { PayPalBox } from './PayPalBox';
import styles from './CartPage.module.scss';
import { UserStoreType } from '../../store/userStore';
import { CartItemProductType } from './CartItem';
import { AppContext } from '../../AppContext';
import { TopBar } from '../Menu/TopBar';

type CartPageProps = {
  userStore: UserStoreType
}

export const CartPage = observer(({userStore}: CartPageProps) => {
  const {rootDiv, root, order, title, itemcard, flexFiller, checkout, amountDiv, amountLabelDiv, amountNum,
    button, divider, fontWeight } = styles;
  const [cartItems, setCartItems] = useState<CartItemProductType[]>([]);
  const [ ready, setReady ] = useState<boolean>(false);
  const { setOpenNotification, setSuccessMsg, cartItemNumber } = useContext(AppContext);
  
  const setCartItemsAndNotificationAfterDeleteHandler = () => {
    setOpenNotification(true);
    setSuccessMsg('You have deleted this item from your cart.');
    setItemsHandler()
  }

  const setCartItemsAndNotificationAfterChangeHandler = () => {
    setOpenNotification(true);
    setSuccessMsg('Item quantity has been changed.');
    setItemsHandler()
  }
  //TODO: figure out the type of res in TS
  const setItemsHandler = async():Promise<any> => {
    let res;
    if (userStore.id) {
      res = await postData('/api/cart/get', {userId: userStore.id});
    } else if (localStorage.guestId) {
      res = await postData('/api/guestcart/get', {guestId: localStorage.guestId});
    }
    setCartItems(res.data);
    setReady(true)
  }

  useEffect(() => {
    setItemsHandler()
  },[userStore.id, cartItemNumber, localStorage.guestId]);

  const cartItemsAmount = cartItems.reduce((a,b) => b.quantity * b.price + a, 0);
  const cartOrderValue = Number(cartItemsAmount.toFixed(2));
  const cartDeliveryAmount = 4.00;
  const getTotalAmount =  cartOrderValue ? Number((cartOrderValue + cartDeliveryAmount).toFixed(2)) : 0;
  
  return ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={rootDiv}>
        <div className={root}>
          <Paper elevation={0} className={order} >
              <Typography variant='h5' className={title}>
                Shopping Cart
              </Typography>
              {cartItems.map((item, idx)=>
                <div key={item._id.toString() + item.specificationValue}>
                <Paper elevation={0} className={itemcard}>
                    <CartItem 
                      item={item} userStore={userStore} 
                      setCartItemsAndNotificationAfterDeleteHandler={setCartItemsAndNotificationAfterDeleteHandler}
                      setCartItemsAndNotificationAfterChangeHandler={setCartItemsAndNotificationAfterChangeHandler}
                    />
                </Paper>
                {idx + 1 < cartItems.length && <Divider variant="middle" />}
                </div>
                )}
          </Paper>
          <Paper elevation={0} className={checkout} >
            <Typography variant='h5' className={title}>
                Total Amount
            </Typography>
            <Typography variant='body2' className={amountDiv}>
                <div className={amountLabelDiv}>
                  Order value:<br />
                  <div className={flexFiller} />
                  <div className={amountNum}>€ {cartOrderValue.toFixed(2)}</div>
                </div>
                <div className={amountLabelDiv}>
                  Delivery:<br />
                  <div className={flexFiller} />
                  <div className={amountNum}>€ {cartDeliveryAmount.toFixed(2)}</div>
                </div>
                <Divider className={divider} />
                <div  className={cn(amountLabelDiv, fontWeight)}>
                  Total amount: 
                  <div className={flexFiller} />
                  <div className={cn(amountNum,fontWeight)}> € {getTotalAmount.toFixed(2)}</div>
                </div>
                <Button variant="contained" className={button} disableElevation>
                  Checkout
                  {getTotalAmount && <PayPalBox totalAmount={getTotalAmount} userId={userStore.id} />}
                </Button>
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  ) : null
});
