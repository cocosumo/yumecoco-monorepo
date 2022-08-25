import { FormFieldKeys } from '../form';
import { FormikTextField } from '../../../../components/ui/textfield';
import { FormLabel, Grid } from '@mui/material';
import { Submit } from './Submit';
type BasicDetailsFields = Array<{
  name: Partial<FormFieldKeys>,
  label: string
}>;

export const KeywordSearch = () => {

  const basicDetailsFields: BasicDetailsFields = [
    { name: 'custName', label: '氏名又は会社名' },
    { name: 'contactNum', label: '電話番号' },
    { name: 'email', label: 'メールアドレス' },
  ];


  return (
    <>
      <Grid item xs={12} mb={-2}><FormLabel>キーワード検索</FormLabel></Grid>

      {basicDetailsFields
        .map(({ name, label })=> {
          return <Grid key={name} item xs={12} md={4}><FormikTextField {...{ name, label }}/> </Grid>;
        })}
      <Grid item xs={12} md={8} ><FormikTextField name={'address' as FormFieldKeys} label="現住所/工事場所住所" /> </Grid>
      <Submit/>

    </>

  );
};