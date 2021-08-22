import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import cn from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../../const/constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { StyledBadge } from '../../util/StyledBadge';
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
import styles from './Menu.module.scss';
import { UserStoreType } from '../../store/userStore';
import { getFilters } from '../../App.util';
import { AppContext } from '../../AppContext';
import { logoutAction } from '../../util/helper'

type MenuProps = {
  store: UserStoreType;
}

type MenuComponentProps = {
  store: UserStoreType;
}

const useStylesForMenu = makeStyles((theme) => ({
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

export const Menu = ({store}: MenuProps) => 
  <MenuComponent store={store} />

const MenuComponent = observer(({store}: MenuComponentProps) => {
    const {content, appBar, appBarShift, contentShift} = useStylesForMenu();
    const {root, hide, menuButton,drawerHeader, header, filterDiv, link, text, login, filterBar, 
      margin, padding, siteName, loginDiv, welcome, span, logout, icons} = styles;
    const [open, setOpen] = useState(false);
    const { setMenuCategory, setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber } = useContext(AppContext);

    const handleDrawerOpen = () => { setOpen(true) };

    const handleDrawerClose = () => { setOpen(false) };

    const handleGetAllProduct = () => { setMenuCategory('') };

    const handleLogout = () => {
      logoutAction(store)
      setCartItemNumber(0)
      setOpenNotification(true);
      setSuccessMsg('You have successfully logged out.')
    };

    useEffect(()=>{
      getFilters();
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
                  <Link to="/" className={cn(header, link)} onMouseDown={handleGetAllProduct}>
                    My Wei Shop
                  </Link>
              </Typography>
            </Toolbar>
            <SearchBar />
            <Toolbar className={cn(margin, padding, loginDiv)} >
              <div className={text}>
                {store.email ? 
                  <div className={welcome}>
                    <div className={span}>{`Welcome, ${store.firstName}`}</div>
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
        <MenuDrawer open={open} handleDrawerClose={handleDrawerClose}/>
        <main className={clsx(content, {[contentShift]: open})}>
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

