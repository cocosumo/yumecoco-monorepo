import { Grid } from '@mui/material';
import { MemoizedFormikSelect } from '../../../../../components/ui/selects';
import { getCustFieldName } from '../../form';
import koyomi from 'koyomi';
import { daysInMonth } from '../../../../../helpers/utils';

import { memo, useEffect, useState } from 'react';

const dateToday = new Date();
const minAge = 18;
const maxAge = 130;
const yearToday = dateToday.getFullYear();
const maxBirthYear = yearToday - minAge;

const monthOptions = [...Array(12).keys()].map( n => {
  const m = n + 1;
  return ({ label: `${m}月`, value: m.toString() });
});

const yearOptions = [...Array(maxAge).keys()].map((n) => {
  const y = maxBirthYear - n;
  return ({ label:  koyomi.format(y.toString(), 'GGN年'), value: y.toString(), secondaryLabel: y.toString() });
});

/**
 * Select menus are large so I memoiz this.
 * I also opted on using the formik's context on this component
 * as it always forces a rerender.
 *
 */
export const SelectBirthdate = (props: {
  namePrefix: string,
  birthYear: string,
  birthMonth: string
}) => {
  const {
    namePrefix,
    birthMonth = '',
    birthYear = '',
  } = props;

  const [dayOptions, setDayOptions ] = useState<Options>([]);


  useEffect(()=>{
    const days = daysInMonth(
      birthMonth ? +birthMonth : 12,
      birthYear ? +birthYear : yearToday,
    );
    setDayOptions([...Array(days).keys()].map(n => {
      const d = n + 1;
      return ({ label: `${d}日`, value: d.toString() });
    }));

  }, [birthMonth, birthYear]);



  return (
    <Grid container item xs={12}
      md={9} spacing={1}
    >
      <Grid item xs={6}>
        <MemoizedFormikSelect
          name={`${namePrefix}${getCustFieldName('birthYear')}`}
          label="生年"
          helperText='<任意>個別設定可'
          options={yearOptions}
        />
      </Grid>
      <Grid item xs={3}>
        <MemoizedFormikSelect
          name={`${namePrefix}${getCustFieldName('birthMonth')}`}
          label="月"
          options={monthOptions}
        />
      </Grid>
      <Grid item xs={3}>
        <MemoizedFormikSelect
          name={`${namePrefix}${getCustFieldName('birthDay')}`}
          label="日"
          options={dayOptions}
        />
      </Grid>
    </Grid>
  );
};



export const MemoizedSelectBirthdate = memo(SelectBirthdate);