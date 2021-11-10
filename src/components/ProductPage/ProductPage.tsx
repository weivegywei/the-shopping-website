import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { TopBar } from '../Menu/TopBar'
import Typography from '@material-ui/core/Typography';
import { postData } from '../../api/postData';
import { SpecificationValueDropdown } from './SpecificationValueDropdown';
import styles from './ProductPage.module.scss';
import { AppContext } from '../../AppContext';
import { UserStoreType } from '../../store/userStore';
//import { SpecificationType } from '../../store/productStore'
import { loremIpsum } from '../../const/constants';
import { addToCart, addToWishlist } from '../../util/helper';
import { v4 as uuidv4 } from 'uuid';

type ProductPageProps = {
  userStore: UserStoreType 
}

type ProductDataType = {
  itemName: string;
  manufacturerLogoUrl: string;
  inventory: number;
  imageUrl: string;
  price: number;
  description: string;
  //availability: boolean;
  specificationDescription: string;
}

export const ProductPage = ({userStore}: ProductPageProps) => {
  const {root, img, textDiv, text, logoImg, h1, h2, h3, inputDiv, dropDownDiv, numDiv, input, addToCartButton, 
    addToWishlistButton, descriptionDiv} = styles;
  const { id: productId } = useParams<{id: string}>();
  const [ productData, setProductData ] = useState<ProductDataType>({
    itemName: '',
    manufacturerLogoUrl: '',
    inventory: 0,
    imageUrl: '',
    price: 0,
    description: '',
    //availability: true,
    specificationDescription: ''
  })
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ ready, setReady ] = useState<boolean>(false);
  const { setNotificationInfo, cartItemNumber, setCartItemNumber, setWishlistItemNumber, wishlistItemNumber, 
    itemSpecificationValue, setItemSpecificationValue } = useContext(AppContext);
  const { itemName, manufacturerLogoUrl, inventory, imageUrl, price, specificationDescription, description } = productData;

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
      const { name, specificationDescr } = res.data[0];
      setProductData({ ...res.data[0], itemName: name, specificationDescription: specificationDescr[0], 
        manufacturerLogoUrl: res.data[1].logoUrl });
      setItemSpecificationValue(specificationDescr[0].split(',')[0])
      setReady(true)
    }
    fetchAndSetItem()
  }, [productId]);
  console.log(itemSpecificationValue, 'itemSpecificationValue')//TODO to be wrapped in useCallBack

  return ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={root}>
        <img src={imageUrl} alt='' className={img} />
        <div className={textDiv}>
        <Typography variant='h4'>
          <div className={text}>
            <img src={manufacturerLogoUrl} alt='' className={logoImg} />
            {/* <div className={h1}>{manufacturerName}</div> */}
            <div className={h2}>{itemName}</div>
            <div className={h3}>€ {price}</div>
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
            <Typography variant='body1' className={descriptionDiv}>
              {description}<br /><br />{loremIpsum}<br /><br />{loremIpsum}
            </Typography>
          </div>
        </Typography>
        </div>
      </div>
    </>
  ) : null;
}

