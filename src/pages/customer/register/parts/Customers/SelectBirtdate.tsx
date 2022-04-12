import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { CustomerForm, getFieldName } from '../../form';
import koyomi from 'koyomi';
import { daysInMonth } from '../../../../../helpers/utils';
import { useFormikContext } from 'formik';


export const SelectBirtdate = (props: {
  namePrefix: string,
  index: number
}) => {
  const { namePrefix, index } = props;
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const { birthYear, birthMonth } = customers[index];

  const dateToday = new Date();
  const minAge = 18;
  const maxAge = 130;
  const yearToday = dateToday.getFullYear();
  const maxBirthYear = yearToday - minAge;

  const days = daysInMonth(
    birthMonth ? +birthMonth : 12,
    birthYear ? +birthYear : yearToday,
  );

  return (
    <Grid container item xs={12} md={8} spacing={1} >
      <Grid item xs={6}>
        <FormikSelect
        name={`${namePrefix}${getFieldName('birthYear')}`}
        label="生年"
        helperText='<任意>個別設定可'
        options={[...Array(maxAge).keys()].map((n) => {
          const y = maxBirthYear - n;
          return ({ label:  koyomi.format(y.toString(), 'GGN年'), value: y.toString(), secondaryLabel: y.toString() });
        })}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${namePrefix}${getFieldName('birthMonth')}`}
        label="月"
        options={[...Array(12).keys()].map( n => {
          const m = n + 1;
          return ({ label: `${m}月`, value: m.toString() });
        })}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${namePrefix}${getFieldName('birthDay')}`}
        label="日"
        options={[...Array(days).keys()].map(n => {
          const d = n + 1;
          return ({ label: `${d}日`, value: d.toString() });
        })}
        />
      </Grid>
    </Grid>
  );
};