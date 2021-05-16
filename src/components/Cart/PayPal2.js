import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';

export const PayPalBox = ({totalAmount}) => {
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const history = useHistory();

    useEffect(() => {
        if(paypalRef.current) {
            console.log('any buttons', window.paypal.Buttons)
            window.paypal
              .Buttons({
                env: 'sandbox', // Or 'production'
                // Set up the payment:
                // 1. Add a payment callback
                createOrder: (data, actions) => {
                  console.log('creating order..', actions, data)
                  // 2. Make a request to your server
                  return actions.request.post('/api/create-payment')
                  .then(function(res) {
                    // 3. Return res.id from the response
                    console.log(res.id, 'resId');
                    return res.id;
                  });
                  {/*return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: "Your description",
                        amount: {
                          currency_code: "EUR",
                          value: totalAmount,
                        },
                      },
                    ],
                  });*/}
                },
                // Execute the payment:
                // 1. Add an onAuthorize callback
                onAuthorize: function(data, actions) {
                  // 2. Make a request to your server
                  return actions.request.post('/api/execute-payment', {
                    paymentID: data.paymentID,
                    payerID: data.payerID,
                    amount: totalAmount,
                  })
                    .then(function(res) {
                      // 3. Show the buyer a confirmation message.
                    });
                },
                onApprove: async (data, actions) => {
                    console.log('transaction approved', data, actions);
                  const order = await actions.order.capture();
                  setPaid(true);
                  console.log(order);
                  //history.push({pathname: '/afterPayment', state: order});
                },
                onError: (err) => {
                  setError(err);
                  //history.push({pathname: '/afterPayment', state:{err}});
                  console.error(err);
                },
              })
              .render(paypalRef.current);
        }
      }, [paypalRef.current]);

            if (paid) {
                return <div>Payment successful!</div>;
            }
            
            if (error) {
                return <div>Error Occurred in processing payment! Please try again.</div>;
            }

            return <div ref={paypalRef} />;
        
};