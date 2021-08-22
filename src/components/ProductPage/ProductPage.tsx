import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import cn from 'classnames';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { StyledBadge } from '../../util/StyledBadge';
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import { observer } from 'mobx-react';
import { cartItemStore, CartItemStoreType } from '../../store/cartStore';
import styles from './ProductPage.module.scss';
import { ChangeEvent } from 'react';
import { AppContext } from '../../AppContext';
import { SearchBar } from '../Menu/SearchBox';
import { LogOutButton } from '../Menu/LogOutButton';
import { LoginButton } from '../Menu/LoginButton';
import { UserStoreType } from '../../store/userStore';
import { loremIpsum } from '../../const/constants';
import { logoutAction, addToCart } from '../../util/helper';

type ProductPageProps = {
  userStore: UserStoreType 
}
type ProductPageComponentProps = {
  userStore: UserStoreType
  cartItemStore: CartItemStoreType
}

const useStylesForProductPage = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#8ba48a'
  }
}));

export const ProductPage = observer(
  ( {userStore}: ProductPageProps ) => 
  <ProductPageComponent userStore={userStore} cartItemStore={cartItemStore} />)

const ProductPageComponent = ({userStore, cartItemStore}: ProductPageComponentProps) => {
  const {appBarRoot, root, img, textDiv, text, h1, h2, h3, inputDiv, dropDownDiv, numDiv, input, button, siteName, header, link, margin, 
    padding, loginDiv, welcome, span, logout, login, icons, flexfiller, description} = styles;
  const { appBar } = useStylesForProductPage();
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
  const productId = location.state.item._id;
  const manufacturerId = location.state.item.manufacturerId;
  const [ quantity, setQuantity ] = useState(1);
  const [ manufacturerName, setManufactureruName ] = useState<string>('');
  const [ ready, setReady ] = useState<boolean>(false);
  const { setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber } = useContext(AppContext);

  const handleLogout = () => {
    logoutAction(userStore)
    setCartItemNumber(0)
    setOpenNotification(true);
    setSuccessMsg('You have successfully logged out.')
  };
  const handleAddToCart = () => {
    addToCart( userStore.id, productId, quantity, cartItemStore.specificationValue)
    setCartItemNumber(cartItemNumber + quantity)
    setOpenNotification(true);
    setSuccessMsg('Item added to cart.')
  }
  const setQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value));

  useEffect(() => {
    const fetchAndSetManuName = async() => {
      const res = await postData('/api/product/manufacturer/name', {
        manufacturerId
      })
      const fetchedName = res.data[0].name;
      setManufactureruName(fetchedName);
      setReady(true)
    }
    fetchAndSetManuName();
  }, []);

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
            <div className={flexfiller} ></div>
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
      <div className={root}>
        <img src={location.state.item.imageUrl} alt='' className={img} />
        <div className={textDiv}>
        <Typography variant='h4'>
          <div className={text}>
            <div className={h1}>{manufacturerName}</div>
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
            <button className={button} 
              onClick={handleAddToCart}>Add to cart
            </button>
            <Typography variant='body1' className={description}>
              {location.state.item.description}<br /><br />{loremIpsum}<br /><br />{loremIpsum}
            </Typography>
          </div>
        </Typography>
        </div>
      </div>
    </>
  ) : null;
}
