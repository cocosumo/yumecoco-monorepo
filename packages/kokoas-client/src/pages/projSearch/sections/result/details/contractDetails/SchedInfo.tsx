import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { parseISODateToFormat } from 'kokoas-client/src/lib';

export const SchedInfo = ({
  record,
}:{
  record: IContracts
}) => {

  const details = useMemo(() => {
    const {
      startDate,
      startDaysAfterContract,

      finishDate,
      finishDaysAfterContract,
    } = record ?? {};

    const parsedSched: IDetail[] = [
      ['着手', startDate.value, startDaysAfterContract.value],
      ['完成', finishDate.value, finishDaysAfterContract.value],
    ].map(([label, date, daysAftrContract]) => {
      const parsedDays = +daysAftrContract ? `契約の日から${daysAftrContract}日以内` : '';
      return {
        label,
        value: `${parseISODateToFormat(date) ?? '-'} ${parsedDays}`,
      };
    });

    const result: IDetail[] = [
      ...parsedSched,
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