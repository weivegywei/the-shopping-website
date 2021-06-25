import { postData } from './api/postData';
import { cartItemNumberStore } from './store/cartStore.tsx';

export const getUser = () => {
    const userToken = localStorage.getItem('accessToken');
    return postData('/api/user', {token: userToken});
};

export  const getCartItemsNumber = async(userId) => {
    const res = await postData('/api/cart/number', {userId});
    const cartItemsNumber = res.data;
    cartItemNumberStore.changeValue('cartItemNumber', cartItemsNumber);
    return cartItemsNumber;
}
