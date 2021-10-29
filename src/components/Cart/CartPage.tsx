import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames';
import { Paper, Typography, Button, Divider } from '@material-ui/core';
import { CartItem } from './CartItem';
import { postData } from '../../api/postData';
import { observer } from 'mobx-react';
import { PayPalBox } from '../Payment/PayPalBox';
import styles from './CartPage.module.scss';
import { UserStoreType } from '../../store/userStore';
import { CartItemProductType } from './CartItem';
import { AppContext } from '../../AppContext';
import { TopBar } from '../Menu/TopBar';
import { BackToHomeButton } from '../Utilities/BackToHomeButton';

type CartPageProps = {
  userStore: UserStoreType
}

export const CartPage = observer(({userStore}: CartPageProps) => {
  const {rootDiv, root, order, title, itemcard, flexFiller, checkout, amountDiv, amountLabelDiv, amountNum,
    button, divider, fontWeight, goToShopSuggestion, suggestionDiv } = styles;
  const [ cartItems, setCartItems ] = useState<CartItemProductType[]>([]);
  const [ ready, setReady ] = useState<boolean>(false);
  const [ loading , setLoading ] = useState<boolean>(true);
  const { setNotificationState, setOpenNotification, setSnackbarMsg, cartItemNumber, setCartTotalAmount } = useContext(AppContext);
  
  const setCartItemsAndNotificationAfterDeleteHandler = () => {
    setNotificationState('success')
    setOpenNotification(true);
    setSnackbarMsg('You have deleted this item from your cart.');
    setItemsHandler()
  }

  const setCartItemsAndNotificationAfterChangeHandler = () => {
    setNotificationState('success')
    setOpenNotification(true);
    setSnackbarMsg('Item quantity has been changed.');
    setItemsHandler()
  }
  //TODO: figure out the type of res in TS
  const setItemsHandler = async() => {
    let res;
    try {
      if (userStore.id || localStorage.guestId) {
        res = await postData('/api/cart/get', {userId: userStore.id ? userStore.id : localStorage.guestId});
      } else {
        res = {}
      }
    } catch (error) {
      res = {}
    }
    if (res.data && res.data.length) {
      setReady(true); 
      setLoading(false)
      setCartItems(res.data)
    } else {
      setLoading(false)
      setReady(false)
      setCartItems([])
    }
  }

  useEffect(() => {
    setItemsHandler()
  },[userStore.id, cartItemNumber, localStorage.guestId]);

  const cartItemsAmount = cartItems.reduce((a,b) => b.quantity * b.price + a, 0);
  const cartOrderValue = Number(cartItemsAmount.toFixed(2));
  const cartDeliveryAmount = 4.00;
  const totalAmount =  cartOrderValue ? Number((cartOrderValue + cartDeliveryAmount).toFixed(2)) : 0;
  const history = useHistory();
  const handleBackToHome = () => history.push('/');
  const handleCheckout = () => {
    if (totalAmount) {
      if (userStore.id) {
        console.log('user')
        setCartTotalAmount(totalAmount)
        history.push('./paymentmethod')
      } else {
        console.log('guest', localStorage.guestId)
        setCartTotalAmount(totalAmount)
        history.push('/guestcheckout')
      }
    }
  }
  const buttonMsg = 'Go shopping'
  
  return loading ?
    null :
  ready ? (
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
                  <div className={cn(amountNum,fontWeight)}> € {totalAmount.toFixed(2)}</div>
                </div>
                <Button variant="contained" className={button} disableElevation onClick={handleCheckout}>
                  Checkout
                </Button>
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  ) : (
    <>
      <TopBar userStore={userStore} />
        <div className={rootDiv}>
          <div className={suggestionDiv}>
            <Typography className={goToShopSuggestion} variant='h6'>
              You have no item in cart. Put some items here!
            </Typography>
            <BackToHomeButton onClick={handleBackToHome} buttonMsg={buttonMsg}/>
          </div>
        </div>
    </>
  )
});

