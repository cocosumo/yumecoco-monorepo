import { Fragment } from 'react';
import { projTypeIds } from '../../../../config';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { StyledSummaryCell } from './common/StyledSummaryCell';

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
            {(targets?.[id]?.yearlyTarget || 0).toLocaleString()}
          </StyledSummaryCell> 
  
        );
      })}
      <StyledSummaryCell>
        {othersYearlyTarget.toLocaleString()}
      </StyledSummaryCell>

      <StyledSummaryCell
        sx={{
          '&&': {
            borderRight: '2px solid black',
          },
        }}
      >
        {totalTargetAmt.toLocaleString()}
      </StyledSummaryCell>

    </Fragment>
  );
};