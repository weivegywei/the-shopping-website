const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://127.0.0.1:27017';
const { registerRoute } = require('./server/Register/route');
const { createProductRoute, adjustProductInventory} = require('./server/product/create/route');
const { listProductRoute, deleteProductRoute } = require('./server/product/list/route');
const { homepageProductRoute } = require('./server/homepage/route');
const { loginAuthenticationRoute } = require('./server/login/auth');
const { getUserRoute } = require('./server/store/route');
const { getCartRoute, addCartItem, deleteCartItem, getCartItemNumberRoute, changeItemNumber, changeCartStatus } = require('./server/cart/route');
const { createManufacturerRoute } = require('./server/manufacturer/route');
const { homepageProductSearchRoute } = require('./server/homepage/searchRoute');
const { listFilteredProductRoute, getFiltersRoute } = require('./server/product/filter/route');
const { paypalRoute, storePaymentRoute } = require('./server/paypal/route');
const { listOrderRoute, editOrderStatusRoute, getOrderInfoRoute } = require('./server/order/route');
const { editProductRoute } = require('./server/product/edit/route');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {console.log('running my server')});

mongoose.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("mongodb connected")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

createProductRoute(app);

listProductRoute(app);

homepageProductRoute(app);

registerRoute(app);

loginAuthenticationRoute(app);

getUserRoute(app);

getCartRoute(app);

addCartItem(app);

deleteCartItem(app);

deleteProductRoute(app);

createManufacturerRoute(app);

homepageProductSearchRoute(app);

listFilteredProductRoute(app);

getFiltersRoute(app);

paypalRoute(app);

storePaymentRoute(app);

getCartItemNumberRoute(app);

changeItemNumber(app);

changeCartStatus(app);

adjustProductInventory(app);

listOrderRoute(app);

editOrderStatusRoute(app);

getOrderInfoRoute(app);

editProductRoute(app);
