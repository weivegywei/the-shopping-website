import './App.scss';
import { useEffect, useContext } from 'react';
import { Menu } from './components/Menu/Menu.tsx';
import { MainGrid } from './components/GridLists/MainGrid.tsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ProductPage } from './components/ProductPage/ProductPage.tsx';
import { LoginPage } from './components/Login/LoginPage.tsx';
import { CartPage } from './components/Cart/CartPage.tsx';
import { ProductCreatePage } from './components/Admin/Product/ProductCreate.tsx';
import { ProductListPage } from './components/Admin/Product/ProductList.tsx';
import { RegisterPage } from './components/Register/RegisterPage.tsx';
import { observer } from 'mobx-react';
import { getUser, getCartItemsNumber } from './App.util';
import { ManufacturerCreatePage } from './components/Admin/Manufacturer/ManufacturerCreate.tsx';
import { AfterPaymentPage } from './components/Cart/AfterPaymentPage';
import { OrderListPage } from './components/Admin/Order/OrderList.tsx';
import { NotificationSnackbar } from './components/Utilities/Snackbar';
import { SnackbarContext, useSnackbarContext } from './SnackbarContext';

export const AppWrapper = (props) => 
  <SnackbarContext.Provider value={useSnackbarContext()}>
    <App {...props} />
  </SnackbarContext.Provider>

const App = observer(({userStore}) => {
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser();
      if(res && res.data) {
        userStore.setValues(res.data);
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    if(userStore.id) {
      getCartItemsNumber(userStore.id);
    }
  },[userStore.id])

  const { state, openNotification, setOpenNotification, errorMsg, successMsg } = useContext(SnackbarContext);

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
          <Route exact path="/product">
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
          <Route exact path="/admin/product/create">
            <div className="App">
              <ProductCreatePage />
            </div>
          </Route>
          <Route exact path="/admin/product/list">
            <div className="App">
              <ProductListPage />
            </div>
          </Route>
          <Route exact path="/register">
            <div className="App">
              <RegisterPage />
            </div>
          </Route>
          <Route exact path="/admin/manufacturer/create">
            <div className="App">
              <ManufacturerCreatePage />
            </div>
          </Route>
          <Route exact path="/afterPayment">
            <div className="App">
              <AfterPaymentPage />
            </div>
          </Route>
          <Route exact path="/admin/order/list">
            <div className="App">
              <OrderListPage />
            </div>
          </Route>
        </Switch>
      </Router>
      {openNotification && <NotificationSnackbar state={state} openNotification={openNotification} 
      setOpenNotification={setOpenNotification} errorMsg={errorMsg} successMsg={successMsg} />}
    </>
  );
} )