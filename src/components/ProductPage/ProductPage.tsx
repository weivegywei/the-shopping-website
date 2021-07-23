import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import cn from 'classnames';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { StyledBadge } from '../Menu/Menu';
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import { observer } from 'mobx-react';
import { cartItemStore, CartItemStoreType } from '../../store/cartStore';
import { getCartItemsNumber } from '../../App.util';
import styles from './ProductPage.module.scss';
import { ChangeEvent } from 'react';
import { AppContext } from '../../AppContext';
import { SearchBar } from '../Menu/SearchBox';
import { LogOutButton } from '../Menu/LogOutButton';
import { LoginButton } from '../Menu/LoginButton';
import { UserStoreType } from '../../store/userStore';
import { cartItemNumberStore, CartItemNumberStoreKey } from '../../store/cartStore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#8ba48a'
  }
}));

type ProductPageProps = {
  userStore: UserStoreType 
}
type ProductPageComponentProps = {
  userStore: UserStoreType
  cartItemStore: CartItemStoreType
}

export const ProductPage = observer(
  ( {userStore}: ProductPageProps ) => 
  <ProductPageComponent userStore={userStore} cartItemStore={cartItemStore} />)

const ProductPageComponent = ({userStore, cartItemStore}: ProductPageComponentProps) => {
  const {appBarRoot, root, img, textDiv, text, h1, h2, h3, inputDiv, dropDownDiv, numDiv, input, button, siteName, header, link, margin, 
    padding, loginDiv, welcome, span, logout, login, icons, flexfiller, description} = styles;
  const { appBar } = useStyles();
  const {location} = useHistory<{item: {
    _id: string;
    manufacturerId: string;
    imageUrl: string;
    name: string;
    price: number;
    specificationDescr: string;
    inventory: number;
    description: string;
  }}>();
  const userId = userStore.id;
  const productId = location.state.item._id;
  const manuId = location.state.item.manufacturerId;
  const [quantity, setQuantity] = useState(1);
  const [manuName, setManuName] = useState<string>('');
  const { setOpenNotification, setSuccessMsg } = useContext(AppContext);
  const addToCart = async() => {
    const updatedCart = await postData('/api/cart', {
      userId, productId, quantity, specificationValue: cartItemStore.specificationValue});
      setOpenNotification(true);
      setSuccessMsg('Item added to cart.');
      getCartItemsNumber(userStore.id);
    return updatedCart;
  }

  const setQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value));
  const logoutAction = () => {
    localStorage.setItem('accessToken', undefined);
    userStore.setValues({firstName: undefined, lastName: undefined, email: undefined, _id: undefined});
    cartItemNumberStore.changeValue(CartItemNumberStoreKey.cartItemNumber, 0);
    setOpenNotification(true);
    setSuccessMsg('You have successfully logged out.')
  };

  useEffect(() => {
    const fetchManuName = async() => {
      const res = await postData('/api/product/manufacturer/name', {
        manuId
      })
      const fetchedName = res.data[0].name;
      return setManuName(fetchedName);
    };
    fetchManuName();
  }, []);

  return (
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
            <div className={flexfiller} ></div>
            <Toolbar className={cn(margin, padding, loginDiv)} >
              <div className={text}>
                {userStore.email ? 
                  <div className={welcome}>
                    <div className={span}>{`Welcome, ${userStore.firstName}`}</div>
                    <Link to='/' className={cn(link, text, logout)}>
                      <LogOutButton logoutAction={logoutAction} />
                    </Link>
                  </div> : 
                  <Link to="/login" className={login}>
                    <LoginButton />
                  </Link>
                }
              </div>
              <Link to="/cart" className={link}>
                <IconButton className={icons}>
                  <StyledBadge badgeContent={cartItemNumberStore.cartItemNumber}>
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
      <div className={root}>
        <img src={location.state.item.imageUrl} alt='' className={img} />
        <div className={textDiv}>
        <Typography variant='h4'>
          <div className={text}>
            <div className={h1}>{manuName}</div>
            <div className={h2}>{location.state.item.name}</div>
            <div className={h3}>€ {location.state.item.price}</div>
            <div className={inputDiv}>
              <div className={dropDownDiv}>
                <SpecificationValueDropdown values={location.state.item.specificationDescr} 
                cartItemStore={cartItemStore} />
              </div>
              <div className={numDiv}>
                <input type='number' className={input} min='0' max={`${location.state.item.inventory}`} 
                  onChange={setQty}></input>
              </div>
            </div>
            <button className={button} onClick={addToCart}>Add to cart</button>
            <Typography variant='body1' className={description}>
              {location.state.item.description}<br /><br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.<br /><br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </div>
        </Typography>
        </div>
      </div>
    </>
  );
}
