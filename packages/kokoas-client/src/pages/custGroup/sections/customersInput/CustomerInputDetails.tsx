import { Divider, Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { SelectGender } from './SelectGender';
import { Birthdate } from './birthdate/Birthdate';
import { CustomerSectionContainer } from './CustomerSectionContainer';
import { CustomerAddressSection } from './address/CustAddressSection';
import { ContactInput } from './contactInput/ContactInput';

export const CustomerInputDetails = ({
  index,
}: {
  index: number,
}) => {

  return (
    <Stack
      spacing={2}
      divider={<Divider />}
    >
      <CustomerSectionContainer>
        <ControlledTextField 
          name={`customers.${index}.${'custName'}`}
          label='氏名'
          placeholder='山田　太郎'
          required
        />

        <ControlledTextField 
          name={`customers.${index}.${'custNameReading'}`}
          label='氏名フリガナ'
          placeholder='ヤマダ　タロウ'
          required
        />

        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'flex-end'}
          justifyContent={'space-between'}
        >
          <SelectGender
            index={index}
          />

          <Birthdate 
            index={index}
          />

        </Stack>
      </CustomerSectionContainer>
     
      <CustomerAddressSection index={index} />

      <ContactInput index={index} />

    </Stack>
  );
};
