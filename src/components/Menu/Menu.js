import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import cn from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {LoginButton} from './LoginButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MenuDrawer } from './MenuDrawer';
import { observer } from 'mobx-react-lite';
import { LogOutButton } from './LogOutButton';
import { SearchBar } from './SearchBox';
import { ManufacturerFilter } from '../Filter/Manufacturer';
import { CategoryFilter } from '../Filter/Category';
import { PriceFilter } from '../Filter/Price';
import { getData } from '../../api/getData';
import { filterQueryStore } from '../../store/filterStore';
import Badge from '@material-ui/core/Badge';
import { cartItemNumberStore } from '../../store/cartStore';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '92px',
  },
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
  menuButton: {
    marginRight: theme.spacing(3),
    color: '#f5f5f5',
    borderRadius: '5px',
    fontSize: 'small',
    width: 40,
    height: 40
  },
  hide: {
    display: 'none',
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
  header: {
    color:'#f5f5f5',
    textDecoration: 'none',
    margin: '0 30px 0 30px',
  },
  filterDiv: {
    width: '100%',
    height: '56px',
  },
  link: {
    textDecoration: 'none'
  },
  text: {
    color: '#f5f5f5',
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '0 10px 0 10px'
  },
  filterBar: {
    justifyContent: 'start',
    alignItems: 'start',
    margin: '0 60px'
  },
  margin: {
    margin: '0 30px'
  },
  padding: {
    padding: 0
  },
  siteName: {
    width: '250px',
    padding: 0,
    margin: '0 30px'
  },
  loginDiv: {
    width: '300px'
  }, 
  welcome: {
    display: 'flex', 
  }, 
  span: {
    display:'flex',
    minWidth: '120px',
    width: '60%',
    alignItems: 'center',
  }, 
  logout: {
    width: '40%'
  }, 
  icons: {
    color: '#f5f5f5',
    borderRadius: '5px',
    fontSize: 'small',
    width: 40,
    height: 40,
    margin: 5
  }
}));

export const Menu = ({store}) => <MenuComponent store={store} cartItemNumberStore={cartItemNumberStore} />
const MenuComponent = observer(({store}) => {
    const {root,content,hide,appBar,appBarShift,menuButton,drawerHeader,contentShift,header,filterDiv,link, text, 
      filterBar,margin, padding, siteName, loginDiv, welcome, span, logout, icons} = useStyles();
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
      filterQueryStore.changeValue('allManufacturer', res.data.allManufacturer);
      filterQueryStore.changeValue('minPrice', res.data.minPrice);
      filterQueryStore.changeValue('maxPrice', res.data.maxPrice);
    };

    useEffect(()=>{
      getFilters();
    },[])
    console.log(cartItemNumberStore, 'cartItemNumberStore');
  
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
              <Typography variant="h4" noWrap >
                  <Link to="/" className={cn(header, link)} style={{textDecoration:'none'}}>
                    Site Name
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