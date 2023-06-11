import { Stack } from '@mui/material';
import { IProjects } from 'types';
import { Detail, DetailSectionTitle, DetailsContainer } from '../common';
import { useMemo } from 'react';
import { addressBuilder } from 'libs';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { getAgentNames } from 'api-kintone';
import { getAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import { DetailSection } from '../common/DetailSection';

export const ProjectDetails = ({
  recProj,
}:{
  recProj: IProjects
}) => {




  const details = useMemo(() => {
    const {
      postal,
      address1,
      address2,
      addressKari,
  
      buildingType,
      projTypeName,
      projName,

      isAgentConfirmed,
  
      agents,
  
      cancelStatus,
      dataId,
      log,
      memo,
      uuid: projId,
    } = recProj;

    const mainDetails: IDetail[] = [
      {
        label: '工事番号',
        value: dataId.value,
      },
      {
        label: '工事種別',
        value: projTypeName.value,
      },
      {
        label: '工事名',
        value: projName.value,
      },
      {
        label: '住所',
        value: addressBuilder({
          postal: postal.value,
          address1: address1.value,
          address2: address2.value,
        }),
      },
      {
        label: '仮住所',
        value: addressKari.value || '-',
      },
      {
        label: '建物種別',
        value: buildingType.value,
      },
    ];


    const agentDetails: IDetail[] = [
      {
        label: '担当決定',
        value: isAgentConfirmed.value === '0' ? '未決定' : '決定済み',
      },
      {
        label: '担当者',
        value: getAgentNamesByType(agents, 'cocoConst'),
      },
    ];


    const otherDetails: IDetail[] = [
      {
        label: 'ステータス',
        value: cancelStatus.value || '-',
      },
      {
        label: 'ID',
        value: projId.value,
      },
    ];

    return {
      mainDetails,
      agentDetails,
      otherDetails,
    };

  }, [recProj]);

  return (
    <Stack 
      spacing={2}
    >
      <DetailSection 
        title="工事情報"
        details={details.mainDetails}
      />
      <DetailSection 
        title="担当情報"
        details={details.agentDetails}
      />

      <DetailSection 
        title="その他"
        details={details.otherDetails}
      />
      
    </Stack>
  );
};