import { UserStoreType } from '../store/userStore'
import { postData } from '../api/postData'

export const logoutAction = (userStore: UserStoreType) => {
    localStorage.setItem('accessToken', undefined);
    userStore.setValues({firstName: undefined, lastName: undefined, email: undefined, _id: undefined});
};

export const addToCart = async(
        userId: string, productId: string, quantity: number, 
        specificationValue: string
    ) => {
    const updatedCart = await postData('/api/cart/add', {
      userId, productId, quantity, specificationValue});
    return updatedCart;
  }
