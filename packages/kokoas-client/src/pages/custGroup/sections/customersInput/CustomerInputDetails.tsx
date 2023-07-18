import { Divider, Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { SelectGender } from './SelectGender';
import { Birthdate } from './birthdate/Birthdate';
import { Postal } from './address/postal/Postal';
import { CustomerSectionContainer } from './CustomerSectionContainer';

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
        />

        <ControlledTextField 
          name={`customers.${index}.${'custNameReading'}`}
          label='氏名フリガナ'
          placeholder='ヤマダ　タロウ'
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
     
      <CustomerSectionContainer>
        <Postal index={index} />
        <ControlledTextField 
          name={`customers.${index}.${'address1'}`}
          label='住所（県市区町村）'
          placeholder='愛知県豊川市千歳通'
        />
        <ControlledTextField 
          name={`customers.${index}.${'address2'}`}
          label='住所（番地以降）'
          placeholder='２番地１９マンション２３号'
        />
      </CustomerSectionContainer>

    </Stack>
  );
};
