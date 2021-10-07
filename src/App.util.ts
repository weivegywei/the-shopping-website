import { getData } from './api/getData';
import { postData } from './api/postData';
import { filterQueryStore, FilterQueryStoreKeys } from './store/filterStore';
import { userStore } from './store/userStore';

export const getUser = () => {
    const userToken = localStorage.getItem('accessToken');
    return postData('/api/user', {token: userToken});
};

export  const getCartItemsNumber = async(userId: string) => {
  if (userId) {
    const res = await postData('/api/cart/number', {userId});
    return res.data
  }
}

export const getGuestCartItemNumber = async(guestId: string) => {
  if (guestId) {
    try {
      const res = await postData('/api/guestcart/number', {guestId});
      return res.data
    } catch (error) {
      return 0
    }
  }
}

export const getWishlistItemNumber = async(ownerId: string) => {
  if (ownerId) {
    try {
      const res = await postData('/api/wishlist/number', {ownerId});
      return res.data
    } catch (error) {
      return 0
    }
  }
}

export const getUserInfo = async () => {
    const res = await getUser();
    if(res && res.data) {
      userStore.setValues(res.data);
    }
  }

export const getFilters = async() => {
  const res = await getData('/api/product/filter');
  //filterQueryStore.changeValue(FilterQueryStoreKeys.allManufacturer, res.data.allManufacturer);
  filterQueryStore.changeValue(FilterQueryStoreKeys.minPrice, res.data.minPrice);
  filterQueryStore.changeValue(FilterQueryStoreKeys.maxPrice, res.data.maxPrice);
};

