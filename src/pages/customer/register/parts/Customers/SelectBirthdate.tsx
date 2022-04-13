import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { CustomerForm, getCustFieldName } from '../../form';
import koyomi from 'koyomi';
import { daysInMonth } from '../../../../../helpers/utils';
import { useFormikContext } from 'formik';
import { memo, useEffect, useState } from 'react';

const dateToday = new Date();
const minAge = 18;
const maxAge = 130;
const yearToday = dateToday.getFullYear();
const maxBirthYear = yearToday - minAge;

export const SelectBirthdate = (props: {
  namePrefix: string,
  index: number
}) => {
  const { namePrefix, index } = props;
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const { birthYear, birthMonth } = customers[index] ?? { birthYear: '', birthMonth: '' };
  const [monthOptions, setMonthOptions ] = useState<Options>([]);
  const [yearOptions, setYearOptions ] = useState<Options>([]);
  const [dayOptions, setDayOptions ] = useState<Options>([]);


  useEffect(()=>{
    setMonthOptions([...Array(12).keys()].map( n => {
      const m = n + 1;
      return ({ label: `${m}月`, value: m.toString() });
    }));

    setYearOptions([...Array(maxAge).keys()].map((n) => {
      const y = maxBirthYear - n;
      return ({ label:  koyomi.format(y.toString(), 'GGN年'), value: y.toString(), secondaryLabel: y.toString() });
    }));
  }, []);

  useEffect(()=>{
    console.log('generating days');
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
    <Grid container item xs={12} md={8} spacing={1} >
      <Grid item xs={6}>
        <FormikSelect
        name={`${namePrefix}${getCustFieldName('birthYear')}`}
        label="生年"
        helperText='<任意>個別設定可'
        options={yearOptions}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${namePrefix}${getCustFieldName('birthMonth')}`}
        label="月"
        options={monthOptions}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${namePrefix}${getCustFieldName('birthDay')}`}
        label="日"
        options={dayOptions}
        />
      </Grid>
    </Grid>
  );
};



export const MemoizedSelectBirthdate = memo(SelectBirthdate);