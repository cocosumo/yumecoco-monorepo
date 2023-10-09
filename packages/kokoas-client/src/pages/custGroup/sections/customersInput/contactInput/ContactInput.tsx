import { Stack } from '@mui/material';
import { CustomerSectionContainer } from '../CustomerSectionContainer';
import { ControlledTextField } from '../../../fields/ControlledTextField';
import { ContactRelation } from './ContactRelation';
import { KFormCustomer } from '../../../schema';
import { ContactName } from './ContactName';

const contactsFields: Array<{
  contactField: KFormCustomer,
  relationField: KFormCustomer,
  relName: KFormCustomer,
  label: string,
  placeholder: string,
  required?: boolean,
}> = [
  {
    contactField: 'phone1',
    relationField: 'phone1Rel',
    relName: 'phone1Name',
    label: '電話番号１',
    placeholder: '000-0000-0000',
    required: true,
  },
  {
    contactField: 'phone2',
    relationField: 'phone2Rel',
    relName: 'phone2Name',
    label: '電話番号２',
    placeholder: '000-0000-0000',
  },
  {
    contactField: 'email',
    relationField: 'emailRel',
    relName: 'emailName',
    label: 'メールアドレス',
    placeholder: 'kokyaku@gmail.com',
  },

];

export const ContactInput = ({
  index,
}:{
  index: number,
}) => {

  return (
    <CustomerSectionContainer>
      {contactsFields.map(({
        contactField,
        relationField,
        relName,
        label,
        placeholder,
        required,
      }) => {
        return (
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'flex-start'}
            width={700}
            key={contactField}
          >
            <ControlledTextField
              name={`customers.${index}.${contactField}`}
              label={label}
              placeholder={placeholder}
              width={200}
              required={required}
            />
            <ContactRelation
              index={index}
              name={relationField}
              required={required}
            />
            <ContactName
              index={index}
              relFieldName={relationField}
              name={relName}

            />
          </Stack>
        );
      })}
    </CustomerSectionContainer>
  );
};
