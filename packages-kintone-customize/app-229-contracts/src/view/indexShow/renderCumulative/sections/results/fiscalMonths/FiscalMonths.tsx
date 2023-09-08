import { UseContractsByFiscalYearReturn } from '../../../hooks/useContractsByFiscalYear';
import { useTypedWatch } from '../../../hooks/useTypedRHF';

export const FiscalMonths = ({
  fiscalYearQuery,
}:{
  fiscalYearQuery: UseContractsByFiscalYearReturn,
}) => {

  const [
    year,
    selectedMonths,
  ] = useTypedWatch({
    name: [
      'months',
    ],
  }) as [string, string[]];

  const {
    data,
  } = fiscalYearQuery;



  return (
    <>
      {/*   {selectedMonths.map((month) => {


      })} */}
    </>
  );

};