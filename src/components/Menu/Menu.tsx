import { useState, useEffect } from 'react';
import clsx from 'clsx';
import cn from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LoginButton } from './LoginButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MenuDrawer } from './MenuDrawer';
import { observer } from 'mobx-react-lite';
import { LogOutButton } from './LogOutButton';
import { SearchBar } from './SearchBox';
import { ManufacturerFilter } from '../Filter/Manufacturer';
import { CategoryFilter } from '../Filter/Category';
import { PriceFilter } from '../Filter/Price';
import { getData } from '../../api/getData';
import { filterQueryStore, FilterQueryStoreKeys } from '../../store/filterStore';
import Badge from '@material-ui/core/Badge';
import { cartItemNumberStore, CartItemNumberStoreType } from '../../store/cartStore';
import styles from './Menu.module.scss';
import { UserStoreType } from '../../store/userStore';
import { getCartItemsNumber } from '../../App.util';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#8ba48a'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

type MenuProps = {
  store: UserStoreType;
}

type MenuComponentProps = {
  store: UserStoreType;
  cartItemNumberStore: CartItemNumberStoreType;
}

export const Menu = ({store}: MenuProps) => <MenuComponent store={store} cartItemNumberStore={cartItemNumberStore} />
const MenuComponent = observer(({store, cartItemNumberStore}: MenuComponentProps) => {
    const {content, appBar, appBarShift, contentShift} = useStyles();
    const {root, hide, menuButton,drawerHeader, header, filterDiv, link, text, 
      filterBar, margin, padding, siteName, loginDiv, welcome, span, logout, icons} = styles;
    const [open, setOpen] = useState(false);

    const StyledBadge = withStyles(() => ({
      badge: {
        border: `1px solid white`,
        background:'#8ba48a'
      },
    }))(Badge);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const getFilters = async() => {
      const res = await getData('/api/product/filter');
      filterQueryStore.changeValue(FilterQueryStoreKeys.allManufacturer, res.data.allManufacturer);
      filterQueryStore.changeValue(FilterQueryStoreKeys.minPrice, res.data.minPrice);
      filterQueryStore.changeValue(FilterQueryStoreKeys.maxPrice, res.data.maxPrice);
    };

    useEffect(()=>{
      getFilters();
    },[])

    useEffect(()=> {
      getCartItemsNumber(store.id)
    },[])
  
    return (
      <>
      <div className={root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(appBar, {[appBarShift]: open})}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(menuButton, open && hide)}
            >
              <MenuIcon />
            </IconButton>
            <Toolbar className={siteName}>
              <Typography variant="h5" noWrap >
                  <Link to="/" className={cn(header, link)} >
                    SITE NAME
                  </Link>
              </Typography>
            </Toolbar>
            <SearchBar />
            <Toolbar className={cn(margin, padding, loginDiv)}>
              <div className={text}>
                {store.email ? 
                  <div className={welcome}>
                    <div className={span}>{`Welcome, ${store.firstName}`}</div>
                    <Link to='/login' className={cn(link, text, logout)}><LogOutButton /></Link>
                  </div> : 
                  <Link to="/login" className={cn(link, text)}><LoginButton /></Link>}
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
        <MenuDrawer open={open} handleDrawerClose={handleDrawerClose}/>
        <main
          className={clsx(content, {
            [contentShift]: open,
          })}
        >
          <div className={drawerHeader} />
        </main>
      </div>
      <div className={filterDiv}>
        <Toolbar className={filterBar}>
          <ManufacturerFilter />
          <CategoryFilter />
          <PriceFilter />
        </Toolbar>
      </div>
      </>
    );
  })