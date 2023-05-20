import Grid from '@mui/material/Unstable_Grid2/';
import { StaticContents } from 'kokoas-client/src/components';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';

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

  const parsedData : ComponentProps<typeof StaticContents>['data'] = useMemo(() => {

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
    <Grid xs={12}>
      <StaticContents 
        editUrl={`${pages.projRegV2}?${generateParams({
          custGroupId: custGroupId as string,
          projId: projId as string,
        })}`}
        data={parsedData}
        isLoading={isLoading}
      />
    
    </Grid>
  );
};