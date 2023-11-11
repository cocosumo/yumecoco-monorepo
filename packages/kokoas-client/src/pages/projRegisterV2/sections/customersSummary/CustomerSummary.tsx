import { pages } from '../../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useWatch } from 'react-hook-form';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import {  useMemo } from 'react';

import { Customers } from './Customers';
import { TForm } from '../../schema';
import { Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StaticContentContainer } from 'kokoas-client/src/components/ui/information/StaticContentContainer';
import { StaticContentInfos } from 'kokoas-client/src/components/ui/information/StaticContentInfos';
import { StaticContentActions } from 'kokoas-client/src/components/ui/information/StaticContentActions';
import { groupAgentsByType } from 'api-kintone/src/custgroups/helpers/groupAgentsByType';


export const CustomerSummary = () => {
  const [
    custGroupId,
    projId,
  ] = useWatch<TForm>({
    name: [
      'custGroupId',
      'projId',

    ],
  }) as string[];

  const { data, isLoading } = useCustGroupById(custGroupId as string);


  const navigate = useNavigate();


  const parsedData = useMemo(() => {

    if (!data ) return {
      custData: [],
      officerData: [],
    };

    /*     const constructionOfficers = empData?.map(({
      文字列＿氏名: empName,
    }) => empName.value).join('、'); */

    const {
      storeName,
      agents,
    } = data || {};

    const {
      yumeAG,
      cocoAG,
    } = groupAgentsByType(agents);
  
    const custData = [
      { label: '店舗', value: storeName?.value },
    ];

    const officerData = [
      { label: 'ゆめてつAG', value: yumeAG.map(({ value:{ employeeName } }) => employeeName.value ).join('、') },
      { label: 'ここすも営業担当者', value: cocoAG.map(({ value:{ employeeName } }) => employeeName.value ).join('、')  },
      //{ label: '工事担当者', value: constructionOfficers || '' },
    ];

    return {
      custData,
      officerData,
      
    };

  }, [
    data,
    //empData,
  ]); 

  if (isLoading) return <LinearProgress />;

  return (
    <StaticContentContainer>

      {custGroupId && <Customers custGroupId={custGroupId as string} />}

      <StaticContentInfos 
        data={[...parsedData.custData, ...parsedData.officerData]}
      />

      <StaticContentActions>
        <Button
          onClick={() => navigate(`${pages.custGroupEditV2}?${generateParams({
            custGroupId: custGroupId as string,
            projId: projId as string,
          })}`)}
          variant='outlined'
        >
          編集
        </Button>
      </StaticContentActions>

    </StaticContentContainer>
  );


 
};