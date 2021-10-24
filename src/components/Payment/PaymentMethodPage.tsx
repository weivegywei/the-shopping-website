import { Paper } from '@material-ui/core';
import { PayPalBox } from './PayPalBox'
import styles from './PaymentMethodPage.module.scss'
import { BackToHomeButton } from '../Utilities/BackToHomeButton'
import { useHistory } from 'react-router';
import { userStore } from '../../store/userStore';

export const PaymentMethodPage = () => {
    const { root, title, paperDiv, buttonDiv, flexfiller } = styles;
    const history = useHistory();
    const onClick = () => {
        history.push('./guestcheckout')
    }
    const buttonMsg = 'Go back'

    return (
        <div className={root}>
            <Paper elevation={0} className={paperDiv}>
                <div className={title}>
                    Please select payment method
                </div>
                <div className={buttonDiv}>
                    <PayPalBox userId={userStore.id} guestId={localStorage.guestId} />
                </div>
                <div className={flexfiller}></div>
                <BackToHomeButton onClick={onClick} buttonMsg={buttonMsg} />
            </Paper>
        </div>
    )
}