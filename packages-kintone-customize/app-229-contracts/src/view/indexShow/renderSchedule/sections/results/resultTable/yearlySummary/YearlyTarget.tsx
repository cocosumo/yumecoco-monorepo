import { Fragment } from 'react';
import { projTypeIds } from '../../../../config';
import { YearlyRowHeader } from './YearlyRowHeader';
import { YearlyCell } from './YearlyCell';
import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { StyledSummaryCell } from './StyledSummaryCell';

export const YearlyTarget = ({
  data,
}:{
  data: UseTargetDataReturn['data']
}) => {
  const {
    fiscalYearData,
  } = data || {};

  const {
    othersYearlyTarget = 0,
    totalTargetAmt = 0,
    targets,
  } = fiscalYearData || {};


  return (
    <Fragment>
      <YearlyRowHeader label={'目標売上額'} />

      {projTypeIds.map((id) => {
        return (
          <StyledSummaryCell
            key={id}
          >
            {targets?.[id].yearlyTarget || 0}
          </StyledSummaryCell> 
  
        );
      })}
      <StyledSummaryCell>
        {othersYearlyTarget}
      </StyledSummaryCell>

      <StyledSummaryCell>
        {totalTargetAmt}
      </StyledSummaryCell>

    </Fragment>
  );
};