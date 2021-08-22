import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { postData } from '../../api/postData';
import styles from './PayPalBox.module.scss';

type PayPalBoxProps = {
  totalAmount: number;
  userId: string;
}

declare global {
  interface Window {
      paypal: any;
  }
}

export const PayPalBox = ({totalAmount, userId}: PayPalBoxProps) => {
    const history = useHistory();
    const { paypalbtn } = styles;

    useEffect(() => {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback
            payment: (data: any, actions: any) => {
              // 2. Make a request to your server
              return actions.request.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/create-payment',{
                  totalAmount
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
                totalAmount, 
              })
                .then((res: {totalAmount: number; currency: string}) => {
                  // 3. Show the buyer a confirmation message.
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
    
      return <div id="paypal-button" className={paypalbtn}></div>
}

