import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { postData } from '../../api/postData';
import { AppContext } from '../../AppContext';
import styles from './PayPalBox.module.scss';

type PayPalBoxProps = {
  userId?: string;
  guestId?: string;
}

declare global {
  interface Window {
      paypal: any;
  }
}

export const PayPalBox = ({userId, guestId}: PayPalBoxProps) => {
    const history = useHistory();
    const { paypalButton } = styles;
    const { setCartItemNumber, cartTotalAmount } = useContext(AppContext) 

    useEffect(() => {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback
            payment: (data: any, actions: any) => {
              // 2. Make a request to your server
              return actions.request.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/create-payment',{
                  totalAmount: cartTotalAmount
              })
                .then((res: {id: string}) => {
                  // 3. Return res.id from the response
                  return res.id;
                });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: (data: {paymentID: string; payerID: string; orderID: string}, actions: any) => {
              // 2. Make a request to your server
              return actions.request.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/execute-payment', {
                paymentID: data.paymentID,
                payerID: data.payerID,
                totalAmount: cartTotalAmount, 
              })
                .then((res: {totalAmount: number; currency: string}) => {
                  // 3. Show the buyer a confirmation message.
                  console.log(userId, 'userid', guestId, 'guestid')
                    if (userId) {
                    postData('/api/store-payment',{userId, orderId: data.orderID, 
                      payerId: data.payerID, paymentId: data.paymentID, amount: res.totalAmount, currency: res.currency});
                    postData('/api/admin/product/inventory', {userId});
                    postData('/api/cart/status', {userId});
                  } else if (guestId) {
                    postData('/api/store-guest-payment',{guestId, orderId: data.orderID, 
                      payerId: data.payerID, paymentId: data.paymentID, amount: res.totalAmount, currency: res.currency});
                    postData('/api/admin/product/inventory', {guestId});
                    postData('/api/guestcart/status', {guestId})
                    setCartItemNumber(0)
                  }
                  history.push({pathname: '/afterPayment', state:{orderID: data.orderID, 
                    paidAmount: res.totalAmount, currencyUnit: res.currency}});
                  
                });
                  
            }
          }, '#paypal-button');
    }, [])
    
      return <div id="paypal-button" className={paypalButton}></div>
}

