import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';

export const OtherInfo = ({
  record,
}:{
  record: IContracts
}) => {

  const details = useMemo(() => {
    const {
      作成日時: createDate,
      更新日時: updateDate,
      作成者: createdBy,
      更新者: updatedBy,
      uuid: contractId,
    } = record ?? {};

    const result: IDetail[] = [
      {
        label: '作成日時',
        value: parseISOTimeToFormat(createDate.value),
      },
      {
        label: '更新日時',
        value: parseISOTimeToFormat(updateDate.value),
      },
      {
        label: '作成者',
        value: createdBy.value.name,
      },
      {
        label: '更新者',
        value: updatedBy.value.name,
      },
      {
        label: '契約ID',
        value: contractId.value,
      },
    ];

    return result;

  }, 
  [record]);


  return (
    <DetailSection
      title={'管理用'}
      details={details}
    />
  );
};