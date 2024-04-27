import { RequestHandler } from 'express';
import { GetDownloadOrderSlipResult } from 'types/src/common/order';
import validator from 'validator';
import { getOrderData } from './getOrderData';
import { createOrderDocument } from './createOrderDocument';

export const downloadOrderToSupplier:  RequestHandler<
unknown,
GetDownloadOrderSlipResult | Error,
{ orderId: string }
> = async (req, res) => {
  
  try {
    const orderId = validator.escape(req.body.orderId);
    if (!orderId) throw new Error('orderId is required');
    console.log('getDownloadOrderToSupplier', orderId);
    
    const dataResult = await getOrderData(orderId);
    const fileB64 = await createOrderDocument(dataResult, 'base64');

    const response: GetDownloadOrderSlipResult = {
      data: dataResult,
      fileName: `発注書-${dataResult.orderId}.pdf`,
      fileB64: fileB64 as string,
    };

    

    res.json(response); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .json({
        message: validator.escape(err?.message || 'Error in getDownloadOrderToSupplier'),
        name: err?.name || 'getDownloadOrderToSupplier',
      });
  }
};