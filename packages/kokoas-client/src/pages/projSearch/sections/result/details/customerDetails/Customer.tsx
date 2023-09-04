import { Stack } from '@mui/material';
import { getContactByType } from 'api-kintone/src/customers/helper/getContactByType';
import { addressBuilder, postalBuilder } from 'libs';
import { dateBuilder } from 'libs/src/dateBuilder';
import { useMemo } from 'react';
import { ICustomers } from 'types';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { 
  Detail, 
  DetailsContainer, 
} from '../common';


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
      isSameAsMain,
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
        value: tels.filter(Boolean).join(', '),
      },
      { 
        label: 'メアド',
        value: emails.join(', '),
      },

    ];

    const newPostal = postalBuilder(postalCode.value);
    const secondColumn: IDetail[] = [
      {
        label: '生年月日',
        value: dateBuilder({
          year: +birthYear.value,
          month: +birthMonth.value,
          day: +birthDay.value,
        }),
      },
      {
        label: '住所',
        value: +isSameAsMain.value 
          ? '顧客１と同じ' 
          : (<>
            <div>
              {newPostal}
            </div>
            { addressBuilder({
              address1: address1.value,
              address2: address2.value,
            })}
          </>
          ),
      },

    ];

    return [
      firstColumn.filter(({ value }) => value),
      secondColumn.filter(({ value }) => value),
    ];


  }, [customer]) ; 

  return ( 
    <DetailsContainer>
      

      {details
        .filter((col) => col.length)
        .map((col) => (
          <Stack 
            key={col[0].label} 
            width={'100%'}
            spacing={1}
          >
            {col
              .map((detailProps) => (
                <Detail key={detailProps.label} {...detailProps} />
              ))}
          </Stack>
        ))}
    </DetailsContainer>

  );
};


