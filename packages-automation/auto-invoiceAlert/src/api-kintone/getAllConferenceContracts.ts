import { getAllRecords } from 'api-kintone';
import { IConfContracts, confContractAppId } from '../../config';

export const getAllConferenceContracts =  async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<IConfContracts>({
  ...params,
  app: confContractAppId,
  orderBy: '作成日時 desc',
});
