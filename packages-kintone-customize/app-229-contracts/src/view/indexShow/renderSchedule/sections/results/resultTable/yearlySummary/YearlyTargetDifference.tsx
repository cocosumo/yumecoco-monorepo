import { Fragment } from 'react';
import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { projTypeIds } from '../../../../config';
import { red } from '@mui/material/colors';
import { StyledSummaryCell } from './common/StyledSummaryCell';
import { roundTo } from 'libs';

/** 目標まで差額 */
export const YearlyTargetDifference = ({
  data,
  year,
}:{
  data: UseTargetDataReturn['data']
  year: number,
}) => {
  const {
    fiscalYearData,
    contractsData,
  } = data || {};

  const {
    othersYearlyTarget = 0,
    totalTargetAmt = 0,
    targets,
  } = fiscalYearData || {};

  const {
    contractsByType,
    totalAmtExclTax = 0,
  } = contractsData?.[year] || {};
  


  return (
    <Fragment>
      <YearlyRowHeader label={'目標まで差額'} />

      {projTypeIds.map((id) => {
        const targetValue = (targets?.[id]?.yearlyTarget || 0) * 10000;
        const actualValue = contractsByType?.[id]?.totalAmtExclTax || 0;
        const diff = roundTo((targetValue - actualValue) / 10000);
        return (

          <StyledSummaryCell
            key={id}
            sx={{
              color: red[600],
            }}
          >
            {diff}
          </StyledSummaryCell>
  
        );
      })}
      <StyledSummaryCell 
        sx={{
          color: red[600],
        }}
      >
        {roundTo(
          (
            (othersYearlyTarget * 10000) - (contractsByType?.['その他']?.totalAmtExclTax || 0)
          ) / 10000,
        )}
      </StyledSummaryCell>


      {/* <YearlyCell color={red[600]} value={totalTargetAmt} /> */}
      <StyledSummaryCell
        sx={{
          color: red[600],
          '&&': {
            borderRight: '2px solid black',
          },
        }}
      >
        {roundTo(
          (
            (totalTargetAmt * 10000) - totalAmtExclTax
          ) / 10000,
        )}
      </StyledSummaryCell>

    </Fragment>
  );
};