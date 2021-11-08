import './App.scss';
import { useEffect, useContext } from 'react';
import { Menu } from './components/Menu/Menu';
import { MainGrid } from './components/GridLists/MainGrid';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductPage } from './components/ProductPage/ProductPage';
import { LoginPage } from './components/Login/LoginPage';
import { CartPage } from './components/Cart/CartPage';
import { ProductCreate } from './components/Admin/Product/ProductCreate';
import { ProductList } from './components/Admin/Product/ProductList';
import { RegisterPage } from './components/Register/RegisterPage';
import { observer } from 'mobx-react';
import { getUserInfo, getCartItemsNumber, getWishlistItemNumber } from './App.util';
import { ManufacturerCreate } from './components/Admin/Manufacturer/ManufacturerCreate';
import { AfterPaymentPage } from './components/Payment/AfterPaymentPage';
import { OrderList } from './components/Admin/Order/OrderList';
import { NotificationSnackbar } from './components/Utilities/Snackbar';
import { AppContext, useAppContext } from './AppContext';
import { WishlistPage } from './components/Wishlist/WishlistPage';
import { GuestCheckoutPage } from './components/Cart/GuestCheckoutPage'
import { PaymentMethodPage } from './components/Payment/PaymentMethodPage'

export const AppWrapper = (props) => 
  <AppContext.Provider value={useAppContext()}>
    <App {...props} />
  </AppContext.Provider>

const App = observer(({userStore}) => {
  const { setCartItemNumber, setWishlistItemNumber } = useContext(AppContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  const fetchAndSetCartAndWishlistItemNum = async() => {
    let cartItemNumber = userStore.id ? await getCartItemsNumber(userStore.id) : localStorage.guestId ? 
    await getCartItemsNumber(localStorage.guestId) : 0;
    let listItemNumber = userStore.id ? await getWishlistItemNumber(userStore.id) : localStorage.guestId ? 
    await getWishlistItemNumber(localStorage.guestId) : 0;
    setCartItemNumber(cartItemNumber)
    setWishlistItemNumber(listItemNumber)
  }

  useEffect(() => {
    if(userStore.id || localStorage.guestId) {
      fetchAndSetCartAndWishlistItemNum()
    }
  },[userStore.id, localStorage.guestId])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <Menu store={userStore} />
              <MainGrid />
          </div>
          </Route>
          <Route path="/product/:id">
            <div className="App">
              <ProductPage userStore={userStore} />
            </div>
          </Route>
          <Route exact path="/login">
            <div className="App">
              <LoginPage />
            </div>
          </Route>
          <Route exact path="/cart">
            <div className="App">
              <CartPage userStore={userStore} />
            </div>
          </Route>
          <Route exact path="/wishlist">
            <div className="App">
              <WishlistPage userStore={userStore} />
            </div>
          </Route>
          <Route exact path="/admin/product/create">
            <div className="App">
              <ProductCreate />
            </div>
          </Route>
          <Route exact path="/admin/product/list">
            <div className="App">
              <ProductList />
            </div>
          </Route>
          <Route exact path="/register">
            <div className="App">
              <RegisterPage />
            </div>
          </Route>
          <Route exact path="/admin/manufacturer/create">
            <div className="App">
              <ManufacturerCreate />
            </div>
          </Route>
          <Route exact path="/afterPayment">
            <div className="App">
              <AfterPaymentPage />
            </div>
          </Route>
          <Route exact path="/admin/order/list">
            <div className="App">
              <OrderList />
            </div>
          </Route>
          <Route exact path="/guestcheckout">
            <div className="App">
              <GuestCheckoutPage />
            </div>
          </Route>
          <Route exact path="/paymentmethod">
            <div className="App">
              <PaymentMethodPage />
            </div>
          </Route>
        </Switch>
      </Router>
      <NotificationSnackbar />
    </>
  );
} )
