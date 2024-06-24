import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { StaticContents } from '../parts/StaticContents';
import { addressBuilder } from 'libs';
import { pages } from 'kokoas-client/src/pages/Router';
import { useTypedWatch } from '../hooks/useTypedRHF';



export const CustomerInfo = () => {

  const [
    custGroupId,
    custName,
  ] = useTypedWatch({
    name: [
      'custGroupId',
      'custName',
    ],
  }) as [string, string];

  const { data, isLoading } = useCustGroupById(custGroupId);

  const parsedData: ComponentProps<typeof StaticContents>['data'] = useMemo(() => {

    if (!data) return [];

    const {
      storeName,
      members,
    } = data || {};

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
      { label: '顧客名', value: custName },
      { label: '現住所', value: address },
    ];

  }, [
    data,
    custName,
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
