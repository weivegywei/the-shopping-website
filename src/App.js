import './App.css';
import { useEffect } from 'react';
import { Menu } from './components/Menu/Menu';
import { MainGrid } from './components/GridLists/MainGrid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ProductPage } from './components/ProductPage/ProductPage';
import { LoginPage } from './components/Login/LoginPage';
import { CartPage } from './components/Cart/CartPage';
import { ProductCreatePage } from './components/Admin/Product/ProductCreate';
import { ProductListPage } from './components/Admin/Product/ProductList';
import { RegisterPage } from './components/Register/RegisterPage';
import { observer } from 'mobx-react';
import { getUser, getCartItemsNumber } from './App.util';
import { ManufacturerCreatePage } from './components/Admin/Manufacturer/ManufacturerCreate';
import { AfterPaymentPage } from './components/Cart/AfterPaymentPage';
import { OrderListPage } from './components/Admin/Order/OrderList';

export const App = observer(({userStore}) => {
  useEffect(async() => {
    const res = await getUser();
    if(res && res.data) {
      userStore.setValues(res.data);
    }
  }, []);

  useEffect(() => {
    if(userStore.id) {
      getCartItemsNumber(userStore.id);
    }
  },[userStore.id])

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
    </>
  );
} )