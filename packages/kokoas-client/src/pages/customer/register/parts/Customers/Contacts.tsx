import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { FormikTextFieldV2 as FormikTextField } from '../../../../../components/ui/textfield';
import {  getCustFieldName } from '../../form';

interface ContactProps {
  name: string,
  label: string,
  disabled: boolean,
  required?: boolean,
  type?: string
}

const typeOptions = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他']
  .map(item => ({ label: item, value: item }));
typeOptions.unshift({ label: '---', value: '' });

export const Contact = (props: ContactProps) => {
  const {
    name,

    required = false,
  } = props;

  return (
    <>
      <Grid item xs={6}>
        <FormikTextField {...props} />
      </Grid>
      <Grid item xs={6}>
        <FormikSelect
          name={`${name}Rel`} label="続柄"
          options={typeOptions}
          required={required}
        />
      </Grid>
    </>
  );
};

export const Contacts = (props : {
  namePrefix: string,
  disabled: boolean,
}) => {
  const { namePrefix, disabled } = props;
  const fields : Omit<ContactProps, 'disabled'>[] = [
    { name: `${namePrefix}${getCustFieldName('phone1')}`, label: '電話番号1', type: 'tel', required: true },
    { name: `${namePrefix}${getCustFieldName('phone2')}`, label: '電話番号2', type: 'tel' },
    { name: `${namePrefix}${getCustFieldName('email')}`, label: 'メールアドレス', type: 'email' },
  ];

  return (<>
    {
      fields.map(item => <Contact key={item.name} {...item} disabled={disabled} />)
    }

  </>);
};