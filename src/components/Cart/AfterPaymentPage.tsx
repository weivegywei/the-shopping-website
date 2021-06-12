import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import styles from './AfterPaymentPage.module.scss';

export const AfterPaymentPage = () => {
    const {root, box, text} = styles;
    const {location} = useHistory<{
        orderID: string;
        paidAmount: number;
        currencyUnit: string;
    }>();
    const orderID = location.state.orderID;
    const paidAmount = location.state.paidAmount;
    const currencyUnit = location.state.currencyUnit;

    return (
        <div className={root}>
            <div className={box}>
            {location.state ? 
            <>
                <div>Thank you</div>
                <Typography variant='h6' className={text}>
                    You paid {paidAmount} {currencyUnit}.<br />
                    Payment Succeed!<br />
                    Order ID: {orderID}
                </Typography>
            </>
            : 
            <Typography variant='h6' className={text}>
                Error Occurred in the process! Please try again.
            </Typography>
            }
            </div>
        </div>
    )
}
