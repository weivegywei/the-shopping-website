import { useContext } from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import cn from 'classnames';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { StyledBadge } from '../../util/StyledBadge';
import { SearchBar } from '../Menu/SearchBox';
import { LogOutButton } from '../Menu/LogOutButton';
import { LoginButton } from '../Menu/LoginButton';
import { UserStoreType } from '../../store/userStore';
import { AppContext } from '../../AppContext';
import { logoutAction } from '../../util/helper';
import styles from './TopBar.module.scss'
import logo_full from '../Pics/logo_full.png'

type TopBarProp = {
    userStore: UserStoreType
}

const useStylesForTopBar = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: '#8ba48a'
    }
  }));

export const TopBar = ({userStore}: TopBarProp) => {
    const {appBarRoot, text,  siteName, header, link, margin, padding, loginDiv, welcome, span, logout, 
        login, icons, flexfiller, logo} = styles;
    const { appBar } = useStylesForTopBar();
    const { setNotificationInfo, cartItemNumber, setCartItemNumber, wishlistItemNumber, setWishlistItemNumber } = useContext(AppContext);
    const handleLogout = () => {
        logoutAction(userStore)
        setCartItemNumber(0)
        setWishlistItemNumber(0)
        setNotificationInfo('success', 'You have successfully logged out.')
      };

    return (
        <div className={appBarRoot}>
            <CssBaseline />
            <AppBar position="fixed" className={appBar}>
                <Toolbar>
                    <Toolbar className={siteName}>
                        <Typography variant="h5" noWrap >
                        <Link to="/" className={cn(header, link)}>
                            <img src={logo_full} className={logo} ></img>
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
                                <StyledBadge badgeContent={cartItemNumber} data-test='topBar-cartButton'>
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                        <Link to="/wishlist" className={link}>
                            <IconButton className={icons}>
                                <StyledBadge badgeContent={wishlistItemNumber}>
                                    <FavoriteBorderIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

