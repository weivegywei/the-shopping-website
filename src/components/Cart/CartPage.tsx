import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames';
import { Paper, Typography, Button, Divider } from '@material-ui/core';
import { CartItem } from './CartItem';
import { postData } from '../../api/postData';
import { observer } from 'mobx-react';
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
  const { setNotificationInfo, setCartTotalAmount } = useContext(AppContext);
  
  const afterDeleteHandler = () => {
    setNotificationInfo('success', 'You have deleted this item from your cart.')
    setItemsHandler()
  }

  const afterChangeHandler = () => {
    setNotificationInfo('success', 'Item quantity has been changed.')
    setItemsHandler()
  }

  const setItemsHandler = async() => {
    setLoading(true)
    console.log('called')
    if (userStore.id || localStorage.guestId) {
      const res = await postData('/api/cart/get', {userId: userStore.id ?? localStorage.guestId});
      if (res.data.length) {
        console.log(res.data)
        setReady(true); 
        setCartItems(res.data)
      } else {
        setReady(false)
        setCartItems([])
      }
    } else {
      setReady(false)
      setCartItems([])
    }
    setLoading(false)
  }

  useEffect(() => {
    setItemsHandler()
  },[]);

  const cartItemsAmount = cartItems.reduce((a,b) => b.quantity * b.price + a, 0);
  const cartOrderValue = Number(cartItemsAmount.toFixed(2));
  const cartDeliveryAmount = 4.00;
  const totalAmount =  cartOrderValue ? Number((cartOrderValue + cartDeliveryAmount).toFixed(2)) : 0;
  const history = useHistory();
  const handleBackToHome = () => history.push('/');
  const handleCheckout = () => {
    if (totalAmount) {
      setCartTotalAmount(totalAmount)
      history.push(userStore.id ? '/paymentmethod' : '/guestcheckout')
    }
  }
  const buttonMsg = 'Go shopping'
  
  return loading ? null : ready ? (
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
                      afterDeleteHandler={afterDeleteHandler}
                      afterChangeHandler={afterChangeHandler}
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
