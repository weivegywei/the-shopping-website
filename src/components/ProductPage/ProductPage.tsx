import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { TopBar } from '../Menu/TopBar'
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import { observer } from 'mobx-react';
import { cartItemStore, CartItemStoreType } from '../../store/cartStore';
import styles from './ProductPage.module.scss';
import { ChangeEvent } from 'react';
import { AppContext } from '../../AppContext';
import { UserStoreType } from '../../store/userStore';
import { loremIpsum } from '../../const/constants';
import { addToCart, addToGuestCart, addToWishlist } from '../../util/helper';
import { v4 as uuidv4 } from 'uuid';

type ProductPageProps = {
  userStore: UserStoreType 
}
type ProductPageComponentProps = {
  userStore: UserStoreType
  cartItemStore: CartItemStoreType
}

export const ProductPage = observer(
  ( {userStore}: ProductPageProps ) => 
  <ProductPageComponent userStore={userStore} cartItemStore={cartItemStore} />)

const ProductPageComponent = ({userStore, cartItemStore}: ProductPageComponentProps) => {
  const {root, img, textDiv, text, h1, h2, h3, inputDiv, dropDownDiv, numDiv, input, addToCartButton, 
    addToWishlistButton, description} = styles;
  const {location} = useHistory<{item: {
    _id: string;
    manufacturerId: string;
    imageUrl: string;
    name: string;
    price: number;
    specificationDescr: string;
    inventory: number;
    description: string;
  }}>();
  const productId = location.state.item._id;
  const manufacturerId = location.state.item.manufacturerId;
  const [ quantity, setQuantity ] = useState(1);
  const [ manufacturerName, setManufactureruName ] = useState<string>('');
  const [ ready, setReady ] = useState<boolean>(false);
  const { setOpenNotification, setSuccessMsg, cartItemNumber, setCartItemNumber, setWishlistItemNumber, 
    wishlistItemNumber } = useContext(AppContext);

  const handleAddToCart = () => {
    if (userStore.id) {
      addToCart( userStore.id, productId, quantity, cartItemStore.specificationValue)
    } else if (localStorage.guestId) {
      addToGuestCart( localStorage.guestId, productId, quantity, cartItemStore.specificationValue)
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      addToGuestCart( generatedGuestId, productId, quantity, cartItemStore.specificationValue)
    }
    setCartItemNumber(cartItemNumber + quantity)
    setOpenNotification(true);
    setSuccessMsg('Item added to cart.')
  }

  const handleAddToWishlist = () => {
    if (userStore.id) {
      addToWishlist( userStore.id, productId, cartItemStore.specificationValue)
    } else if (localStorage.guestId) {
      addToWishlist( localStorage.guestId, productId, cartItemStore.specificationValue)
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      addToWishlist( generatedGuestId, productId, cartItemStore.specificationValue)
    }
    setWishlistItemNumber(wishlistItemNumber + 1)
    setOpenNotification(true);
    setSuccessMsg('Item added to wishlist.')
  }

  const setQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value));

  useEffect(() => {
    const fetchAndSetManuName = async() => {
      const res = await postData('/api/product/manufacturer/name', {
        manufacturerId
      })
      const fetchedName = res.data[0].name;
      setManufactureruName(fetchedName);
      setReady(true)
    }
    fetchAndSetManuName();
  }, []);

  return ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={root}>
        <img src={location.state.item.imageUrl} alt='' className={img} />
        <div className={textDiv}>
        <Typography variant='h4'>
          <div className={text}>
            <div className={h1}>{manufacturerName}</div>
            <div className={h2}>{location.state.item.name}</div>
            <div className={h3}>€ {location.state.item.price}</div>
            <div className={inputDiv}>
              <div className={dropDownDiv}>
                <SpecificationValueDropdown values={location.state.item.specificationDescr} 
                cartItemStore={cartItemStore} />
              </div>
              <div className={numDiv}>
                <input type='number' className={input} defaultValue='1' min='1' max={`${location.state.item.inventory}`} 
                  onChange={setQty}></input>
              </div>
            </div>
            <button className={addToCartButton} 
              onClick={handleAddToCart}>Add to cart
            </button>
            <button className={addToWishlistButton} 
              onClick={handleAddToWishlist}>Add to wishlist
            </button>
            <Typography variant='body1' className={description}>
              {location.state.item.description}<br /><br />{loremIpsum}<br /><br />{loremIpsum}
            </Typography>
          </div>
        </Typography>
        </div>
      </div>
    </>
  ) : null;
}

