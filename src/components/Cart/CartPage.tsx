import {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CartItem } from './CartItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { postData } from '../../api/postData';
import { observer } from 'mobx-react';
import cn from 'classnames';
import { PayPalBox } from './PayPalBox';
import { NotificationSnackbar } from '../Utilities/Snackbar';
import styles from './CartPage.module.scss';
import { UserStoreType } from '../../store/userStore';
import { CartItemProductType } from './CartItem';

type CartPageProps = {
  userStore: UserStoreType
}

export const CartPage = observer(({userStore}: CartPageProps) => {
  const {rootDiv, root, order, title,itemcard,flexFiller,checkout, amountDiv,
    amountLabelDiv,amountNum,button, divider, fontWeight} = styles;
  const [cartItems, setcartItems] = useState<CartItemProductType[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const successMsg = 'You have deleted this item from your cart.'
  
  const setCartItemsAndNotificationHandler = () => {
    setCartItemsHandler();
    setOpenNotification(true);
  }

  const setCartItemsHandler = async() => {
    const res = await postData('/api/cart/get', {userId: userStore.id});
    setcartItems([...res.data]);
  }

  useEffect(() => {
    if(userStore.id) {
      setCartItemsHandler();
    }
  },[userStore.id]);

  const [initiatePayPal, setInitiatePayPal] = useState(false);
  const cartItemsAmount = cartItems.reduce((a,b) => b.quantity * b.price + a, 0);
  const cartOrderValue = Number(cartItemsAmount.toFixed(2));
  const cartDeliveryAmount = 7.99;
  const totalAmount = Number((cartOrderValue + cartDeliveryAmount).toFixed(2));
  
  return (
    <>
      <div className={rootDiv}>
        <div className={root}>
          <Paper elevation={0} className={order} >
              <Typography variant='h5' className={title}>
                Shopping Cart
              </Typography>
              {cartItems.map((item, idx)=>
                <div key={item._id.toString() + item.specificationValue}>
                <Paper elevation={0} className={itemcard}>
                    <CartItem item={item} userStore={userStore} 
                      setCartItemsAndNotificationHandler={setCartItemsAndNotificationHandler} />
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
                  <div className={amountNum}>€ {cartOrderValue}</div>
                </div>
                <div className={amountLabelDiv}>
                  Delivery:<br />
                  <div className={flexFiller} />
                  <div className={amountNum}>€ {cartDeliveryAmount}</div>
                </div>
                <Divider className={divider} />
                <div  className={cn(amountLabelDiv, fontWeight)}>
                  Total amount: 
                  <div className={flexFiller} />
                  <div className={cn(amountNum,fontWeight)}> € {totalAmount}</div>
                    
                </div>
                <Button variant="contained" className={button} disableElevation onClick={()=>setInitiatePayPal(true)} >
                        Checkout
                </Button>
            </Typography>
          </Paper>
          <div id="paypal11-button"></div>
          {initiatePayPal && <PayPalBox totalAmount={totalAmount} userId={userStore.id} />}
        </div>
      </div>
      {openNotification && <NotificationSnackbar state={'success'} openNotification={openNotification} 
        setOpenNotification={setOpenNotification} errorMsg={''} successMsg={successMsg}/>}
    </>
  )
});
