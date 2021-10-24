import { useState, useContext, useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { InputBox } from '../Inputs/InputBox';
import { AppContext } from '../../AppContext';
import styles from './GuestCheckoutPage.module.scss';
import { CountryDropdown } from '../Register/CountryDropdown';
import { postData } from '../../api/postData';
import { useHistory } from 'react-router';

export const GuestCheckoutPage = () => {
    const { root, title, label, buttonDiv,proceedButton } = styles;
    const [ ready, setReady ] = useState<boolean>(false);
    const { userCountry, guestFirstName, setGuestFirstName, guestLastName, setGuestLastName, 
        guestEmail, setGuestEmail, guestAddress, setGuestAddress,setUserCountry } = useContext(AppContext)
    const history = useHistory();
    const handleClick = () => {
        if (localStorage.guestId) {
            postData('/api/guestregister', {
              _id: localStorage.guestId,
              firstName: guestFirstName, 
              lastName: guestLastName, 
              email: guestEmail, 
              address: guestAddress, 
              country: userCountry, role: 'customer', type: 'guest'
            })
          }
        history.push('/paymentmethod')
    }

    useEffect(() => {
        if (localStorage.guestId) {
            const checkGuestExist = async() => {
                const res = await postData('/api/checkguest', {_id: localStorage.guestId})
                console.log(res, 'res')
                if (typeof(res.data[0]) === 'string') {
                    setReady(true)
                } else {
                    const { firstName, lastName, email, address, country } = res.data[0]
                    setGuestFirstName(firstName);
                    setGuestLastName(lastName);
                    setGuestEmail(email);
                    setGuestAddress(address);
                    setUserCountry(country);
                    setReady(true)
                }
            }
            checkGuestExist()
        }
    }, [])

    return ready ? (
      <div className={root}>
        <Paper elevation={0}>
            <div className={title}>
                Please fill in your info for checkout
            </div>
            <InputBox labelName={'First name'} type={'text'} value={guestFirstName} 
                changeValue={(e) => setGuestFirstName(e.target.value)} />
            <InputBox labelName={'Last name'} type={'text'} value={guestLastName}
                changeValue={(e) => setGuestLastName(e.target.value)} />
            <InputBox labelName={'Email address'} type={'email'} value={guestEmail}
                changeValue={(e) => setGuestEmail(e.target.value)} />
            <InputBox labelName={'Shipping address'} type={'text'} value={guestAddress}
                changeValue={(e) => setGuestAddress(e.target.value)} />
            <div className={label}>
                <Typography variant='caption' display='block'>
                    Country
                </Typography>
            </div>
            <CountryDropdown />
            <div className={buttonDiv} style={{marginTop: '30px'}} >
                <button type='submit' className={proceedButton} onClick={handleClick}
                disabled={!(guestFirstName && guestLastName && guestEmail && guestAddress && userCountry)}>
                    Save and Proceed to Payment
                </button>
            </div>
        </Paper>
      </div>
    ) : null
}
