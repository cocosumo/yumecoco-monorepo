
import { useWatch } from 'react-hook-form';
import { StaticContents } from '../parts/StaticContents';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';
import { pages } from '../../Router';


export const CustomerSummary = () => {


  const custGroupId = useWatch({
    name: 'custGroupId',
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
    <StaticContents 
      buttonLabel='顧客情報を編集する'
      data={parsedData}
      isLoading={isLoading}
      pageUrl={pages.custGroupEditV2}
    />
  );
};