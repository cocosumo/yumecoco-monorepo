import { AppIds, isProd } from 'config';
import { produce } from 'immer';
import { DeepPartial, IProjestimates } from 'types';
import { KintoneClientBasicAuth } from './settings';

export const convertTaxTypeToTaxRate = async () => {
  const KintoneRecord = KintoneClientBasicAuth.record;
  const appId = AppIds.projEstimates;

  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as IProjestimates[];


    console.log(`Production: ${isProd}, AppId: ${appId}`);

    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<IProjestimates>

    }>(({
      $id,
      内訳,
      税,
    })=>{
      return {
        id: $id.value,
        record: {
          内訳: {
            type: 'SUBTABLE',
            value: produce(内訳.value, (draft) => {
              const parsedTaxRate = +税.value / 100;

              draft.forEach((d) => {

                // field to be deprecated
                const taxType = (d.value as any).taxType.value;

                d.value.税率.value = (taxType === '課税' ? parsedTaxRate : 0).toString(); 
              });
            }),
          },
        },
      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: appId,
      records: updatedRecords as any,
    });

    return updated;

  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

};