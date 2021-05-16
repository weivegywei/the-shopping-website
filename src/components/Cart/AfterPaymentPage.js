import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#ecebeb',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            width: theme.spacing(62),
          }
      },
    box: {
        display: 'flex',
        background: '#cad2a8',
        height: 350,
        justifyContent: 'center', 
        flexDirection: 'column',
        fontFamily: 'Great Vibes, cursive',
        fontSize: 40,
        color: 'white'
    },
    text: {
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

//export const AfterPaymentPage = observer(() => <AfterPaymentPageComponent />)
export const AfterPaymentPage = () => {
    const {root, box, text} = useStyles();
    const {location} = useHistory();
    const orderID = location.state.orderID;
    const paidAmount = location.state.paidAmount;
    const currencyUnit = location.state.currencyUnit;
    console.log(location.state)

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
