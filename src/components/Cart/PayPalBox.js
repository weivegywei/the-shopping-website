import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { postData } from '../../api/postData';

export const PayPalBox = ({totalAmount, userId}) => {
    const history = useHistory();

    useEffect(() => {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback
            payment: (data, actions) => {
              console.log(data, 'data', actions, 'actions');
              // 2. Make a request to your server
              return actions.request.post('/api/create-payment',{
                  totalAmount
              })
                .then((res) => {
                  // 3. Return res.id from the response
                  console.log(res.id, 'resId')
                  return res.id;
                });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: (data, actions) => {
              // 2. Make a request to your server
              console.log(data, 'data2', actions, 'actions2');
              return actions.request.post('/api/execute-payment', {
                paymentID: data.paymentID,
                payerID: data.payerID,
                totalAmount, 
              })
                .then((res) => {
                  // 3. Show the buyer a confirmation message.
                  //const order = actions.order.capture();
                  console.log('res',res, 'data', data);
                  history.push({pathname: '/afterPayment', state:{orderID: data.orderID, 
                    paidAmount: res.totalAmount, currencyUnit: res.currency}});
                  postData('/api/store-payment',{userId, orderId: data.orderID, 
                    payerId: data.payerID, paymentId: data.paymentID, amount: res.totalAmount, currency: res.currency});
                  postData('/api/admin/product/inventory', {userId});
                  postData('/api/cart/status', {userId});
                });
                  
            }
          }, '#paypal-button');
    }, [])
    

      return <div id="paypal-button"></div>
}