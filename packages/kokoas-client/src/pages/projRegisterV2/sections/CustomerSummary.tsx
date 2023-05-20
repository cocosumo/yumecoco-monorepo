import Grid from '@mui/material/Unstable_Grid2/';
import { StaticContents } from 'kokoas-client/src/components';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useWatch } from 'react-hook-form';
import { useCustGroupById, useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';
import { TypeOfForm } from '../form';

type Dt = ComponentProps<typeof StaticContents>['data'];

export const CustomerSummary = () => {
  const [
    custGroupId,
    projId,
  ] = useWatch<TypeOfForm>({
    name: [
      'custGroupId',
      'projId',
      
    ],
  });

  const { data, isLoading } = useCustGroupById(custGroupId as string);
  const { data: custData } = useCustomersByCustGroupId(custGroupId as string);



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

    const contactDatails: Dt = custData?.map(({
      
    }) => {
      return {
        label
      }
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
    custData,
  ]); 

  return (
    <Grid xs={12}>
      <StaticContents 
        editUrl={`${pages.custGroupEdit}?${generateParams({
          custGroupId: custGroupId as string,
          projId: projId as string,
        })}`}
        data={parsedData}
        isLoading={isLoading}
      />
    
    </Grid>
  );
};