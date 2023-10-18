import { Fragment } from 'react';
import { projTypesToShow } from '../../../../config';
import { YearlyRowHeader } from './YearlyRowHeader';
import { YearlyCell } from './YearlyCell';
import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { roundTo } from 'libs';

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

  console.log('targets', targets);

  return (
    <Fragment>
      <YearlyRowHeader label={'目標売上額'} />

      {projTypesToShow.map(({ id }) => {
        return (
          <YearlyCell key={id} >
            {roundTo(targets?.[id].yearlyTarget || 0).toLocaleString()}
          </YearlyCell>
        );
      })}
      <YearlyCell>
        {roundTo(othersYearlyTarget).toLocaleString()}
      </YearlyCell>
      <YearlyCell>
        {roundTo(totalTargetAmt).toLocaleString()}
      </YearlyCell>
    </Fragment>
  );
};