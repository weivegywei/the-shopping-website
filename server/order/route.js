import { Payment } from "../paypal/paymentSchema";

export const listOrderRoute = (app) => app.get('/api/admin/order/list', async(req, res) => {
    const allPaymentsWithUserInfo = await Payment.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo'
            }
        }
    ]).exec();
    return res.json(allPaymentsWithUserInfo);
});

export const editOrderStatusRoute = (app) => app.post('/api/admin/order/edit', async(req, res) => {
    const paymentUpdated = await Payment.updateOne(
        { _id: req.body.id },
        { $set: { 'status': req.body.status } }
        );
    const paymentObject = await Payment.findOne({_id: req.body.id});
    const newEventObject = {'status': req.body.status, 'time': new Date()};
    paymentObject.events.push(newEventObject);
    paymentObject.save();
    return res.send(paymentObject);
});