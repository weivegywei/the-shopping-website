import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { TopBar } from '../Menu/TopBar'
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import styles from './ProductPage.module.scss';
import { ChangeEvent } from 'react';
import { AppContext } from '../../AppContext';
import { UserStoreType } from '../../store/userStore';
import { loremIpsum } from '../../const/constants';
import { addToCart, addToWishlist } from '../../util/helper';
import { v4 as uuidv4 } from 'uuid';

type ProductPageProps = {
  userStore: UserStoreType 
}

export const ProductPage = ({userStore}: ProductPageProps) => {
  const {root, img, textDiv, text, h1, h2, h3, inputDiv, dropDownDiv, numDiv, input, addToCartButton, 
    addToWishlistButton, description} = styles;
  const { id: productId } = useParams<{id: string}>();
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ imgUrl, setImgUrl ] = useState<string>('');
  const [ itemName, setItemName ] = useState<string>('');
  const [ itemPrice, setItemPrice ] = useState<number>(0);
  const [ specificationDescription, setSpecificationDescription ] = useState<string>('');
  const [ inventory, setInventory ] = useState<number>(0);
  const [ itemDescription, setItemDescription ] = useState<string>('');
  const [ manufacturerName, setManufactureruName ] = useState<string>('');
  const [ ready, setReady ] = useState<boolean>(false);
  const { setNotificationInfo, cartItemNumber, setCartItemNumber, setWishlistItemNumber, wishlistItemNumber, 
    itemSpecificationValue } = useContext(AppContext);

  const handleAddToCart = async() => {
    let resCart;
    if (userStore.id || localStorage.guestId) {
      resCart = await addToCart( userStore.id ? userStore.id : localStorage.guestId, productId, quantity, itemSpecificationValue)
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      resCart = await addToCart( generatedGuestId, productId, quantity, itemSpecificationValue)
    }
    if (resCart) {
      setCartItemNumber(cartItemNumber + quantity)
      setNotificationInfo('success', 'Item added to cart.')
    } else {
      setNotificationInfo('error', 'Adding item failed, please try again.')
    }
  }

  const handleAddToWishlist = async() => {
    if (userStore.id || localStorage.guestId) {
      addToWishlist( userStore.id ?? localStorage.guestId, productId, itemSpecificationValue)
    } else {
      const generatedGuestId = uuidv4();
      localStorage.setItem('guestId', generatedGuestId);
      addToWishlist( generatedGuestId, productId, itemSpecificationValue)
    }
    setWishlistItemNumber(wishlistItemNumber + 1)
    setNotificationInfo('success', 'Item added to wishlist.')
  }

  const setQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value));

  useEffect(() => {
    const fetchAndSetItem = async() => {
      setReady(false);
      const res = await postData('/api/product/info', {productId})
      const { imageUrl, inventory, name, price, specificationDescr, description } = res.data[0];
      setManufactureruName(res.data[1].name);
      setImgUrl(imageUrl);
      setItemName(name);
      setItemPrice(price);
      setInventory(inventory);
      setSpecificationDescription(specificationDescr[0]);
      setItemDescription(description)
      setReady(true)
    }
    fetchAndSetItem()
  }, [productId]);

  return ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={root}>
        <img src={imgUrl} alt='' className={img} />
        <div className={textDiv}>
        <Typography variant='h4'>
          <div className={text}>
            <div className={h1}>{manufacturerName}</div>
            <div className={h2}>{itemName}</div>
            <div className={h3}>€ {itemPrice}</div>
            <div className={inputDiv}>
              <div className={dropDownDiv}>
                <SpecificationValueDropdown values={specificationDescription} />
              </div>
              <div className={numDiv}>
                <input type='number' className={input} defaultValue='1' min='1' max={`${inventory}`} 
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
              {itemDescription}<br /><br />{loremIpsum}<br /><br />{loremIpsum}
            </Typography>
          </div>
        </Typography>
        </div>
      </div>
    </>
  ) : null;
}

