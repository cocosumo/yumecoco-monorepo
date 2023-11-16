import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { formatDataId, locale } from 'libs';
import { parseISODateToFormat } from 'kokoas-client/src/lib';
import { Files } from './Files';
import { useEstimateById } from 'kokoas-client/src/hooksQuery';
import { ContractRecipients } from 'kokoas-client/src/components/ui/information/';

export const ContractInfo = ({
  record,
}:{
  record: IContracts
}) => {
  const {
    envelopeId,
    projEstimateId,
    signMethod,
    contractDate,
    envRecipients,
    envelopeStatus,
    envDocFileKeys,
    contractType,
    contractAddType,
    memo,
  } = record ?? {};

  const { data: estData } = useEstimateById(projEstimateId.value || '');

  const {
    record: estRec,
  } = estData || {};

  const {
    dataId,
  } = estRec || {};


  const details = useMemo(() => {

    let parsedContractType = contractType.value || '契約';
    if (contractType.value === '追加') {
      parsedContractType = `${parsedContractType} (${contractAddType.value})`;
    }

    const hasContract = !!envelopeStatus?.value;

    const result: IDetail[] = [
      {
        label: '署名経路',
        value: <ContractRecipients hasContract={hasContract} rawRecipients={envRecipients} />,
      },
      {
        label: '書類',
        value: envDocFileKeys.value.length ?  <Files files={envDocFileKeys}  /> : '-',
      },
      {
        label: '契約日',
        value: parseISODateToFormat(contractDate.value),
      },
      {
        label: '見積枝番',
        value: formatDataId(dataId?.value)
          .split('-')
          .at(-1) || '-',
      },
      {
        label: 'ドキュサインID',
        value: envelopeId?.value || '-',
      },
      {
        label: '署名手法',
        value: locale[signMethod.value] || '-',
      },
      {
        label: 'カテゴリ',
        value: parsedContractType || '-',
      },
      {
        label: '備考',
        value: memo?.value || '-',
      },
      

    ];

    return result;

  }, 
  [
    envelopeId,
    signMethod,
    contractDate,
    envRecipients,
    envelopeStatus,
    envDocFileKeys,
    dataId,
    contractType,
    contractAddType,
    memo,
  ]);


  return (
    <DetailSection
      title={'契約情報'}
      details={details}
    />
  );
};