import { UseContractsByFiscalYearReturn } from '../../../hooks/useContractsByFiscalYear';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { FiscalMonthTable } from './fiscalMonthTable/FiscalMonthTable';

export const FiscalMonths = ({
  fiscalYearQuery,
}:{
  fiscalYearQuery: UseContractsByFiscalYearReturn,
}) => {

  const [
    selectedMonths,
  ] = useTypedWatch({
    name: [
      'months',
    ],
  }) as [string[]];

  const {
    data,
  } = fiscalYearQuery;

  console.log(data);

  return (
    <>
      {selectedMonths.map((month) => {
        return (
          <FiscalMonthTable 
            key={month}
            title={`${month}月度`}
            records={data?.[month]?.contracts || []}
          />
        );

      })}

    </>
  );

};