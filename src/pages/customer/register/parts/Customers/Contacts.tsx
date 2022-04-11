import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { FormikTextField } from '../../../../../components/ui/textfield';
import { CustomerInstanceKeys } from '../../form';

interface ContactProps {
  name: string,
  label: string,
  type?: string
}

const typeOptions = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他']
  .map(item => ({ label: item }));

export const Contact = (props: ContactProps) => {
  const {
    name,
  } = props;
  return (
    <>
      <Grid item xs={6}>
        <FormikTextField {...props}/>
      </Grid>
      <Grid item xs={6}>
        <FormikSelect name={`${name}Type`} label="続柄" options={typeOptions}/>
      </Grid>
    </>
  );
};

export const Contacts = <T extends CustomerInstanceKeys>(props : { namePrefix: string }) => {
  return (<>
    {
      [
        { name: `${props.namePrefix}${'phone1' as T}`, label: '電話番号1', type: 'tel' },
        { name: `${props.namePrefix}${'phone2' as T}`, label: '電話番号2', type: 'tel' },
        { name: `${props.namePrefix}${'email' as T}`, label: 'メールアドレス', type: 'email' },

      ]
        .map(item => <Contact key={item.name} {...item} />)
    }

  </>);
};