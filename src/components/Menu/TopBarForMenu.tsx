import cn from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StyledBadge } from '../../util/StyledBadge';
import { LoginButton } from './LoginButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { LogOutButton } from './LogOutButton';
import { SearchBar } from './SearchBox';
import IconButton from '@material-ui/core/IconButton';
import styles from './TopBarForMenu.module.scss'
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { UserStoreType } from '../../store/userStore';
import myWeiStoreLogo from '../Pics/myWeiStoreLogo.png';

type TopBarForMenuProps = {
    store: UserStoreType;
    handleGetAllProduct: () => void;
    handleLogout: () => void
}

export const TopBarForMenu = ({store, handleGetAllProduct, handleLogout}: TopBarForMenuProps) => {
    const {header, link, text, login, margin, padding, siteName, loginDiv, welcome, span, logout, icons, 
      topBar, logo} = styles;
    const { cartItemNumber } = useContext(AppContext)

    return (
        <AppBar position='relative' className={topBar} elevation={0}>
          <Toolbar>
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
    )
}

