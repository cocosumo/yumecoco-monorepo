import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getContactByType } from 'api-kintone/src/customers/helper/getContactByType';
import { addressBuilder } from 'libs';
import { ReactNode, useMemo } from 'react';
import { ICustomers } from 'types';

interface IDetail {
  label: string;
  value: ReactNode;
  fonstSize?: string;
}

const Detail = ({
  label,
  value,
  fonstSize,
}: IDetail) => (        
  <Stack direction={'row'}>
    <Typography color={grey[600]} width={'30%'}>
      {label}
    </Typography>
    <Typography 
      width={'70%'}
      fontSize={fonstSize}
    >
      {value}
    </Typography>
  </Stack>
);


export const Customer = ({
  customer,
}:{
  customer: ICustomers
}) => {


  const details = useMemo((): IDetail[][] => {
    const {
      fullName,
      fullNameReading,
      postalCode,
      address1,
      address2,
      gender,
      contacts,
      birthYear,
      birthMonth,
      birthDay,
    } = customer;

    const tels = getContactByType(contacts, 'tel');
    const emails = getContactByType(contacts, 'email');

    const firstColumn: IDetail[] = [
      {
        label: '顧客名',
        value: fullName.value,
      },
      {
        label: '顧客名（カナ）',
        value: fullNameReading.value,
      },
      {
        label: '性別',
        value: gender.value,
      },
  
      
      { 
        label: '電話番号',
        value: tels.join(', '),
      },
      { 
        label: 'メアド',
        value: emails.join(', '),
      },

    ];

    const secondColumn: IDetail[] = [
      {
        label: '住所',
        value: addressBuilder({
          postal: postalCode.value,
          address1: address1.value,
          address2: address2.value,
        }),
      },

    ];

    return [
      firstColumn.filter(({ value }) => value),
      secondColumn.filter(({ value }) => value),
    ];


  }, [customer]) ; 

  return ( 
    <Stack
      p={2} 
      bgcolor={'white'} 
      borderRadius={2}
      direction={'row'}
      spacing={2}
      justifyContent={'space-between'}
    >
      {details.map((col) => (
        <Stack 
          key={col[0].label} 
          width={'50%'}
          spacing={1}
        >
          {col
            .map((detailProps) => (
              <Detail key={detailProps.label} {...detailProps} />
            ))}
        </Stack>
      ))}
    </Stack>

  );
};


