import { Product } from "../product/create/schema";
import { Cart } from "./schema";

const saveNewCart = async (userId) => {
    const cart = new Cart({
        userId, 
        cartItems:[],
        coupons: []
    })
    const a = await cart.save();
    return a;
};

export const getCartRoute = (app) => app.post('/api/cart/get', async(req, res) => {
    const data = await getOrCreateCart(req.body.userId);
    const a = await Cart.aggregate([{
        $addFields: {
            "cartItems.prodId": {
                $map: {
                    input: "$cartItems",
                    as: "r",
                    in: { $toObjectId: "$$r.productId" }
                }
            },
        }
    },
    { $match : { userId : req.body.userId } },
    {
        $lookup: {
            from: 'products',
            localField: 'cartItems.prodId',
            foreignField: '_id',
            as: 'items'
        }
    }
]).exec();
  const cartItemsFullInfoArr = a[0].items.map(item => ({...item, _id: item._id.toString()}));
  const cartItemsUserSpecArr = a[0].cartItems;
  const cartItemsArr = cartItemsFullInfoArr.map(item => ({...item, ...cartItemsUserSpecArr.find(it => it.productId === item._id)}));
  return res.json(cartItemsArr)
});

export const addCartItem = (app) => app.post('/api/cart', async(req, res) => {
    const userCart = await getOrCreateCart(req.body.userId);
    const newItem = {productId: req.body.productId, 
        specificationValue: req.body.specificationValue, 
        quantity: req.body.quantity};
    userCart.cartItems.push(newItem);
    userCart.save();
    return res.json(userCart);
});

export const deleteCartItem = (app) => app.post('/api/cart/delete', async(req, res) => {
    await Cart.updateOne(
        { userId: req.body.userId },
        { $pull: { cartItems: { _id: req.body.cartItemId } } }
      );
    return res.send('Item deleted')
})

const getOrCreateCart = async(userId) => {
    const userCart = await Cart.findOne({userId});
    if (userCart) {
        return userCart;
    } else if (!userCart) {
        const newCart = await saveNewCart(userId);
        return newCart;
    }
}