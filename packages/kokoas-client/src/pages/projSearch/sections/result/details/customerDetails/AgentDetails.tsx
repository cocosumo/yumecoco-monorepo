import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { DetailSection } from '../common/DetailSection';

export const AgentDetails = ({
  storeName,
  cocoAgs,
  yumeAgs,
}:{
  storeName: string,
  cocoAgs: string,
  yumeAgs: string,
}) => {

  const generalDetails: IDetail[] = [
    {
      label: '店舗名',
      value: storeName,
    },
    {
      label: 'ゆめてつAG',
      value: yumeAgs,
    },
    {
      label: 'ここすも営業',
      value: cocoAgs,
    },
   
  ];

  return (

    <DetailSection 
      title={'担当情報'}
      details={generalDetails}
    />
    
  );
};