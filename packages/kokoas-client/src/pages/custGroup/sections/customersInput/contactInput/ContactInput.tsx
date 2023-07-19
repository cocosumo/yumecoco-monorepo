import { Stack } from '@mui/material';
import { CustomerSectionContainer } from '../CustomerSectionContainer';
import { ControlledTextField } from '../../../fields/ControlledTextField';
import { ContactRelation } from './ContactRelation';
import { KFormCustomer } from '../../../schema';

const contactsFields: Array<{
  contactField: KFormCustomer,
  relationField: KFormCustomer,
  label: string,
  placeholder: string,
}> = [
  {
    contactField: 'phone1',
    relationField: 'phone1Rel',
    label: '電話番号１',
    placeholder: '000-0000-0000',
  },
  {
    contactField: 'phone2',
    relationField: 'phone2Rel',
    label: '電話番号２',
    placeholder: '000-0000-0000',
  },
  {
    contactField: 'email',
    relationField: 'emailRel',
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
        label,
        placeholder,
      }) => {
        return (
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'flex-start'}
            key={contactField}
          >
            <ControlledTextField
              name={`customers.${index}.${contactField}`}
              label={label}
              placeholder={placeholder}
              width={200}
            />
            <ContactRelation
              index={index}
              name={relationField}
            />
          </Stack>
        );
      })}
    </CustomerSectionContainer>
  );
};