import { StaticContents } from 'kokoas-client/src/components';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useWatch } from 'react-hook-form';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';

import { Customers } from '../parts/Customers';
import { TForm } from '../schema';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Dt = ComponentProps<typeof StaticContents>['data'];

export const CustomerSummary = () => {
  const [
    custGroupId,
    projId,
  ] = useWatch<TForm>({
    name: [
      'custGroupId',
      'projId',
      
    ],
  });

  const { data, isLoading } = useCustGroupById(custGroupId as string);
  const navigate = useNavigate();
  const parsedData : Dt = useMemo(() => {

    if (!data ) return [];

    const {
      storeName,
      members,
      cocoAGNames,
      yumeAGNames,
    } = data || {};

    const custNames = members.value
      .map(({ value: { customerName } }) => customerName.value )
      .join(', ');
    const {
      postal,
      address1,
      address2,
    } = members.value[0].value;
    
    const address = addressBuilder({
      postal: postal.value,
      address1: address1.value,
      address2: address2.value,
    });

    return [
      { label: '店舗', value: storeName?.value },
      { label: '顧客名', value: custNames },
      { label: '現住所', value: address },
      { label: 'ここすも営業担当者', value: cocoAGNames.value },
      { label: 'ゆめてつAG', value: yumeAGNames.value },
    ];

  }, [
    data,
  ]); 


  return (

    <StaticContents 
      data={parsedData}
      isLoading={isLoading}
      actions={(
        <Button
          onClick={() => navigate(`${pages.custGroupEdit}?${generateParams({
            custGroupId: custGroupId as string,
            projId: projId as string,
          })}`)}
          variant='outlined'
        >
          編集
        </Button>
      )}
    > 
      {custGroupId && <Customers custGroupId={custGroupId as string} />}
    </StaticContents>

   
  );
};