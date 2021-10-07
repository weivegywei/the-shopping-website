import { UserStoreType } from '../store/userStore'
import { postData } from '../api/postData'

export const logoutAction = (userStore: UserStoreType) => {
    localStorage.setItem('accessToken', undefined);
    userStore.setValues({firstName: undefined, lastName: undefined, email: undefined, _id: undefined});
};

export const addToCart = async(
    userId: string, productId: string, quantity: number, specificationValue: string
    ) => {
    const updatedCart = await postData('/api/cart/add', {
      userId, productId, quantity, specificationValue});
    return updatedCart;
}

export const addToGuestCart = async(
  guestId: string, productId: string, quantity: number, specificationValue: string
  ) => {
    const updatedGuestCart = await postData('/api/guestcart/add', {
      guestId, productId, quantity, specificationValue
    });
    return updatedGuestCart
}

export const addToWishlist = async(ownerId: string, productId: string, specificationValue: string) => {
  const updatedWishlist = await postData('/api/wishlist/add', {
    ownerId, productId, specificationValue
  });
  return updatedWishlist;
}

