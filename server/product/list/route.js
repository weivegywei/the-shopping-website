import { Product } from "../create/schema";

export const listProductRoute = (app) => app.get('/api/admin/product/list', async(req, res) => {
    const allProducts = await Product.find().exec();
    return res.json(allProducts)
});

export const deleteProductRoute = (app) => app.post('/api/admin/product/delete', async(req, res) =>{
    await Product.findOneAndDelete({_id: req.body.productId}).exec();
    return res.send('product deleted')
})