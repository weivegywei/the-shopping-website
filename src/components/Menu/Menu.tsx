import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TopBarForMenu } from './TopBarForMenu'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuDrawer } from './MenuDrawer';
import { observer } from 'mobx-react-lite';
import { ManufacturerFilter } from '../Filter/Manufacturer';
import { CategoryFilter } from '../Filter/Category';
import { PriceFilter } from '../Filter/Price';
import styles from './Menu.module.scss';
import { UserStoreType } from '../../store/userStore';
import { getFilters } from '../../App.util';
import { AppContext } from '../../AppContext';
import { logoutAction } from '../../util/helper';
import { getData } from '../../api/getData';

type MenuProps = {
  store: UserStoreType;
}

type MenuComponentProps = {
  store: UserStoreType;
}

export const Menu = ({store}: MenuProps) => 
  <MenuComponent store={store} />

const MenuComponent = observer(({store}: MenuComponentProps) => {
    const {root, hide, menuButton, filterDiv, filterBar, btnAndDrawer, drawerOpen} = styles;
    const [open, setOpen] = useState(false);
    const { setMenuCategory, setOpenNotification, setSuccessMsg, setCartItemNumber, setAllManufacturer, 
      setWishlistItemNumber } = useContext(AppContext);

    const handleDrawerOpen = () => { setOpen(true) };

    const handleDrawerClose = () => { setOpen(false) };

    const handleGetAllProduct = () => { setMenuCategory('') };

    const handleLogout = () => {
      logoutAction(store)
      setCartItemNumber(0)
      setWishlistItemNumber(0)
      setOpenNotification(true);
      setSuccessMsg('You have successfully logged out.')
    };

    useEffect(()=>{
      const getAndSetManufacturers = async() => {
        const res = await getData('/api/product/filter');
        if (res.data) {
          const allM = res.data.allManufacturer.map(m => m.name)
          setAllManufacturer(allM)
        }
      }
      getAndSetManufacturers();
      getFilters()
    },[])
  
    return (
      <>
      <div className={root}>
        <CssBaseline />
          <div className={clsx(btnAndDrawer, {[drawerOpen]: open})}>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(menuButton, {[hide]: open})}
              data-test='homepage-menu-openButton'
            >
              <MenuIcon />
            </IconButton>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose}/>
          </div>
        <TopBarForMenu store={store} handleGetAllProduct={handleGetAllProduct} handleLogout={handleLogout}/>
        
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

