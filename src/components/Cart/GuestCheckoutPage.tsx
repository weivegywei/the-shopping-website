import { useContext } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { InputBox } from '../Inputs/InputBox';
import { AppContext } from '../../AppContext';
import styles from './GuestCheckoutPage.module.scss';
import { CountryDropdown } from '../Register/CountryDropdown';
import { PayPalBox } from './PayPalBox'

export const GuestCheckoutPage = ({_id}) => {
    const { root, title, label, buttonDiv,proceedButton } = styles;
    const { cartTotalAmount, userCountry, guestFirstName, setGuestFirstName, guestLastName, setGuestLastName, 
        guestEmail, setGuestEmail, guestAddress, setGuestAddress } = useContext(AppContext)

    return (
      <div className={root}>
        <Paper elevation={0}>
            <div className={title}>
                Please fill in your info for checkout
            </div>
            <InputBox labelName={'First name'} type={'text'} changeValue={(e) => setGuestFirstName(e.target.value)} />
            <InputBox labelName={'Last name'} type={'text'} changeValue={(e) => setGuestLastName(e.target.value)} />
            <InputBox labelName={'Email address'} type={'email'} changeValue={(e) => setGuestEmail(e.target.value)} />
            <InputBox labelName={'Shipping address'} type={'text'} changeValue={(e) => setGuestAddress(e.target.value)} />
            <div className={label}>
                <Typography variant='caption' display='block'>
                    Country
                </Typography>
            </div>
            <CountryDropdown />
            <div className={buttonDiv} style={{marginTop: '30px'}}>
                <button type='submit' className={proceedButton} 
                disabled={!(guestFirstName && guestLastName && guestEmail && guestAddress && userCountry)}>
                    Save and Proceed to Payment
                    { cartTotalAmount && guestFirstName && guestLastName && guestEmail && guestAddress && userCountry && <PayPalBox guestId={localStorage.guestId} />}
                </button>
            </div>
        </Paper>
      </div>
    )
}
