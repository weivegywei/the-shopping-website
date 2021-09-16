import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import styles from './AfterPaymentPage.module.scss';
import { BackToHomeButton } from './BackToHomeButton';

export const AfterPaymentPage = () => {
    const {root, box, text} = styles;
    const {location} = useHistory<{
        orderID: string;
        paidAmount: number;
        currencyUnit: string;
    }>();
    const history = useHistory();
    const orderID = location.state.orderID;
    const paidAmount = location.state.paidAmount;
    const currencyUnit = location.state.currencyUnit;
    const handleClick = () => history.push('/');
    const buttonMsg = 'Go back'

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
                <BackToHomeButton onClick={handleClick} buttonMsg={buttonMsg}/>
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
