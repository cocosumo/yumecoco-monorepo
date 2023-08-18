import validator from 'validator';
//import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';
import { isEmpty } from 'lodash';
import { createCostMngXlsx } from './createCostMngExcel/createCostMngXlsx';
import format from 'date-fns/format';
import type { RequestHandler } from 'express';
import type { GetCostMgtData, GetCostMgtExcelByDataResult } from 'types';

export const reqCostMgtExcelByData: RequestHandler<
unknown,
GetCostMgtExcelByDataResult,
GetCostMgtData
> = async (req, res) => {
  try {
    const costManagement = req.body;
    const {
      projNum,
    } = costManagement;
    console.log('Converting data to excel...');
    console.log('reqCostMgtExcelByData', costManagement);
    if (isEmpty(costManagement)) throw new Error('costManagement Data is required');
    if (!projNum) throw new Error('projNum is required');
    
    //const result = await getCostMgtDataByProjIdV2(projId);

    const workbook = await createCostMngXlsx(costManagement);

    const fileName = `原価管理表-${projNum}-${format(new Date(), 'yyyyMMddhhmmss.SSS')}.xlsx`;
    /* res.attachment(`原価管理表-${projNum}-${new Date().toISOString()}.xlsx`)
      .status(200); */

    const result = await workbook.xlsx.writeBuffer({ filename: fileName });
    

    res.json({
      fileName,
      fileB64: (result as Buffer).toString('base64'), // kintone proxyはbase64しか受け付けない
    });

  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .json({
        message: validator.escape(err?.message || 'Error in getCostMgtDataByProjId'),
        name: err?.name || 'getCostMgtDataByProjId',
      });
  }
};