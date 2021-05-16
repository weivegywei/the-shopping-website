import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import { observer } from 'mobx-react';
import { cartItemStore } from '../../store/cartStore';
import { NotificationSnackbar } from '../Utilities/Snackbar';
import { getCartItemsNumber } from '../../App.util';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(65),
      height: theme.spacing(75),
    },
  },
  text: {
    display: 'block',
    justifyContent: 'center',
    width: theme.spacing(100),
  },
  h2: {
    height: '30px',
    margin: '50px'
  },
  h3: {
    height: '60px', 
    margin:'30px'
  },
  inputDiv: {
    display:'flex', 
    justifyContent:'center'
  }, 
  input: {
    width: '80px',
     height: '34px', 
     fontSize: '20px',
     '&:focus': {
      outline: 'none'
    }
    },
  button: {
    width:'140px', 
    height:'40px', 
    fontSize: '17px', 
    '&:focus': {
      outline: 'none'
    }
  }
}));

export const ProductPage = observer(({userStore}) => <ProductPageComponent userStore={userStore} cartItemStore={cartItemStore} />)

const ProductPageComponent = ({userStore, cartItemStore}) => {
  const {root, text, h2, h3, inputDiv, input, button} = useStyles();
  const {location} = useHistory();
  const userId = userStore.id;
  const productId = location.state.item._id;
  const [quantity, setQuantity] = useState(1);
  const [openNotification, setOpenNotification] = useState(false);
  const successMsg = 'Item added to cart.'
  const addToCart = async() => {
    const updatedCart = await postData('/api/cart', {
      userId, productId, quantity, specificationValue: cartItemStore.specificationValue});
      setOpenNotification(true);
      getCartItemsNumber(userStore.id);
      console.log(updatedCart,'updatedCart');
    return updatedCart;
  }

  return (
    <>
      <div className={root}>
        <img src={location.state.item.imageUrl} />
        <Typography variant='h4'>
          <div className={text}>
            <div className={h2}>{location.state.item.name}</div>
            <div className={h3}>€ {location.state.item.price}</div>
            <SpecificationValueDropdown values={location.state.item.specificationDescr} cartItemStore={cartItemStore} />
            <div className={inputDiv}>
              <input type='number' className={input} min='0' max={`${location.state.item.inventory}`} 
                  onChange={(e)=>setQuantity(e.target.value)}></input>
              <button className={button} onClick={addToCart}>Add to cart</button>
            </div>
            <Typography variant='body1' style={{margin: '30px'}}>
              {location.state.item.description}<br /><br />
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.<br /><br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </div>
        </Typography>
      </div>
      {openNotification && <NotificationSnackbar state={'success'} openNotification={openNotification} 
        setOpenNotification={setOpenNotification} errorMsg={''} successMsg={successMsg}/>}
    </>
  );
}
