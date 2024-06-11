import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../hooks/useTypedRHF';
import { ComponentProps, useMemo } from 'react';
import { StaticContents } from '../parts/StaticContents';
import { addressBuilder } from 'libs';
import { getAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import { pages } from 'kokoas-client/src/pages/Router';



export const ProjInfo = () => {
  const [
    projId,
  ] = useTypedWatch({
    name: [
      'projId',
    ],
  }) as [string];

  const { data, isLoading } = useProjById(projId as string);

  const parsedData: ComponentProps<typeof StaticContents>['data'] = useMemo(() => {
    if (!data) return [];

    const {
      projName,
      postal,
      address1,
      address2,
      agents,
      store: storeName,
    } = data;

    const address = addressBuilder({
      postal: postal.value,
      address1: address1.value,
      address2: address2.value,
    });

    return [
      { label: '工事名', value: projName.value },
      { label: '店舗', value: storeName.value },
      { label: 'ゆめてつAG', value: getAgentNamesByType(agents, 'yumeAG') || '-' },
      { label: 'ここすも営業担当', value: getAgentNamesByType(agents, 'cocoAG') || '-' },
      { label: '工事担当者', value: getAgentNamesByType(agents, 'cocoConst') || '-' },
      { label: '工事住所', value: address },
    ];

  }, [
    data,
  ]);


  return (
    <StaticContents
      buttonLabel='工事情報を編集する'
      isLoading={isLoading}
      data={parsedData}
      pageUrl={pages.projEditV2}
    />
  );
};
