import { useEffect, useState, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { LogOutButton } from '../Menu/LogOutButton';
import { LoginButton } from '../Menu/LoginButton';
import cn from 'classnames';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { SearchBar } from '../Menu/SearchBox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
import { logoutAction } from '../../util/helper';
import { StyledBadge } from '../../util/StyledBadge';

type CartPageProps = {
  userStore: UserStoreType
}
//TODO: decouple useStyles component with CartPage, MenuPage, and ProductPage
const useStylesForCartPage = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#8ba48a'
  }
}));

export const CartPage = observer(({userStore}: CartPageProps) => {
  const {appBarRoot, siteName, header, link, rootDiv, root, order, title, itemcard, flexFiller, checkout, 
    margin, padding, loginDiv, welcome, logout, login, span, text, amountDiv, amountLabelDiv, amountNum,
    icons, button, divider, fontWeight } = styles;
  const { appBar } = useStylesForCartPage();
  const [cartItems, setCartItems] = useState<CartItemProductType[]>([]);
  const [ ready, setReady ] = useState<boolean>(false);
  const { setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber } = useContext(AppContext);
  
  const setCartItemsAndNotificationHandler = () => {
    setOpenNotification(true);
    setSuccessMsg('You have deleted this item from your cart.');
    setCartItemsHandler();
  }

  const setCartItemsHandler = async() => {
    const res = await postData('/api/cart/get', {userId: userStore.id});
    setCartItems(res.data);
    setReady(true)
  }

  useEffect(() => {
    if(userStore.id) {
      setCartItemsHandler();
    }
  },[userStore.id, cartItemNumber]);

  const handleLogout = () => {
    logoutAction(userStore)
    setCartItemNumber(0)
    setOpenNotification(true);
    setSuccessMsg('You have successfully logged out.')
  };
  const cartItemsAmount = cartItems.reduce((a,b) => b.quantity * b.price + a, 0);
  const cartOrderValue = Number(cartItemsAmount.toFixed(2));
  const cartDeliveryAmount = 4.99;
  const getTotalAmount =  cartOrderValue ? Number((cartOrderValue + cartDeliveryAmount).toFixed(2)) : 0;
  
  return ready ? (
    <>
      <div className={appBarRoot}>
        <CssBaseline />
        <AppBar position="fixed" className={appBar}>
          <Toolbar>
            <Toolbar className={siteName}>
              <Typography variant="h5" noWrap >
                  <Link to="/" className={cn(header, link)}>
                    My Wei Shop
                  </Link>
              </Typography>
            </Toolbar>
            <SearchBar />
            <div className={flexFiller} ></div>
            <Toolbar className={cn(margin, padding, loginDiv)} >
              <div className={text}>
                {userStore.email ? 
                  <div className={welcome}>
                    <div className={span}>{`Welcome, ${userStore.firstName}`}</div>
                    <Link to='/' className={cn(link, text, logout)}>
                      <LogOutButton logoutAction={handleLogout} />
                    </Link>
                  </div> : 
                  <Link to="/login" className={login}>
                    <LoginButton />
                  </Link>
                }
              </div>
              <Link to="/cart" className={link}>
                <IconButton className={icons}>
                  <StyledBadge badgeContent={cartItemNumber}>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
              <IconButton className={icons}>
                <FavoriteBorderIcon />
              </IconButton>
            </Toolbar>
          </Toolbar>
        </AppBar>
      </div>
      <div className={rootDiv}>
        <div className={root}>
          <Paper elevation={0} className={order} >
              <Typography variant='h5' className={title}>
                Shopping Cart
              </Typography>
              {cartItems.map((item, idx)=>{
              console.log(item, 'item'); return(
                <div key={item._id.toString() + item.specificationValue}>
                <Paper elevation={0} className={itemcard}>
                    <CartItem item={item} userStore={userStore} 
                      setCartItemsAndNotificationHandler={setCartItemsAndNotificationHandler}
                      setCartItemsHandler={setCartItemsHandler} />
                </Paper>
                {idx + 1 < cartItems.length && <Divider variant="middle" />}
                </div>)}
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
                  <div className={cn(amountNum,fontWeight)}> € {getTotalAmount}</div>
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
