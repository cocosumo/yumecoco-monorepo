import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { locale } from 'libs';
import { parseISODateToFormat } from 'kokoas-client/src/lib';

export const ContractInfo = ({
  record,
}:{
  record: IContracts
}) => {

  const details = useMemo(() => {
    const {
      envelopeId,
      signMethod,
      contractDate,
    } = record ?? {};

    const result: IDetail[] = [
      {
        label: '契約日',
        value: parseISODateToFormat(contractDate.value),
      },
      {
        label: 'ドキュサインID',
        value: envelopeId?.value ?? '-',
      },
      {
        label: '署名手法',
        value: locale[signMethod.value] ?? '-',
      },
    ];

    return result;

  }, 
  [record]);


  return (
    <DetailSection
      title={'契約情報'}
      details={details}
    />
  );
};