import { RequestHandler } from 'express';
import validator from 'validator';
import { getOrderData } from './getOrderData';



export const downloadOrderToSupplier:  RequestHandler<
{ orderId: string }
> = async (req, res) => {
  
  try {
    const orderId = validator.escape(req.params.orderId);
    if (!orderId) throw new Error('orderId is required');
    console.log('getDownloadOrderToSupplier', orderId);
    
    const result = await getOrderData(orderId);

    res.json(result); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in downloadOrderToSupplier'));
  }
};