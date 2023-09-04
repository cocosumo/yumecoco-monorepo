import { Divider, Stack } from '@mui/material';
import { SelectGender } from './SelectGender';
import { Birthdate } from './birthdate/Birthdate';
import { CustomerSectionContainer } from './CustomerSectionContainer';
import { CustomerAddressSection } from './address/CustAddressSection';
import { ContactInput } from './contactInput/ContactInput';
import { CustName } from './CustName';
import { CustNameReading } from './CustNameReading';

export const CustomerInputDetails = ({
  index,
}: {
  index: number,
}) => {

  return (
    <Stack
      spacing={2}
      divider={<Divider />}
      mt={3} // prevent misclick to accordion

    >
      <CustomerSectionContainer>
        <CustName 
          index={index}
        />

        <CustNameReading
          index={index}
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
