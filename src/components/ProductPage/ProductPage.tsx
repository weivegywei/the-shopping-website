import { useState } from 'react';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import { observer } from 'mobx-react';
import { cartItemStore, CartItemStoreType } from '../../store/cartStore';
import { NotificationSnackbar } from '../Utilities/Snackbar';
import { getCartItemsNumber } from '../../App.util';
import styles from './ProductPage.module.scss';
import { ChangeEvent } from 'react';

type ProductPageProps = {
  userStore: {id: string} 
}
type ProductPageComponentProps = {
  userStore: {id: string};
  cartItemStore: CartItemStoreType
}

export const ProductPage = observer(
  ( {userStore}: ProductPageProps ) => 
  <ProductPageComponent userStore={userStore} cartItemStore={cartItemStore} />)

const ProductPageComponent = ({userStore, cartItemStore}: ProductPageComponentProps) => {
  const {root, text, h2, h3, inputDiv, input, button} = styles;
  const {location} = useHistory<{item: {
    _id: string;
    imageUrl: string;
    name: string;
    price: number;
    specificationDescr: string;
    inventory: number;
    description: string;
  }}>();
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
    return updatedCart;
  }
  const setQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))

  return (
    <>
      <div className={root}>
        <img src={location.state.item.imageUrl} alt='' />
        <Typography variant='h4'>
          <div className={text}>
            <div className={h2}>{location.state.item.name}</div>
            <div className={h3}>€ {location.state.item.price}</div>
            <SpecificationValueDropdown values={location.state.item.specificationDescr} cartItemStore={cartItemStore} />
            <div className={inputDiv}>
              <input type='number' className={input} min='0' max={`${location.state.item.inventory}`} 
                  onChange={setQty}></input>
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
