import { appId, RecordType } from './config';
import { getAllRecords } from '../common';

export const getAllSuppliers = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<RecordType>({
  ...params,
  orderBy: 'supplierName_ruby asc',
  app: appId,
});

export type GetAllSuppliersParams = Parameters<typeof getAllSuppliers>[0];