import { Fragment } from 'react';
import { projTypesToShow } from '../../../../config';
import { YearlyRowHeader } from './YearlyRowHeader';
import { YearlyCell } from './YearlyCell';

export const YearlyTarget = () => {
  return (
    <Fragment>
      <YearlyRowHeader label={'目標売上額'} />

      {projTypesToShow.map(({ id }) => {
        return (
          <YearlyCell key={id} />
        );
      })}
      <YearlyCell />
      <YearlyCell />
    </Fragment>
  );
};