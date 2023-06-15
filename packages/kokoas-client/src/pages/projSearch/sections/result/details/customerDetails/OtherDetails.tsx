import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { DetailSection } from '../common/DetailSection';

export const OtherDetails = ({
  custGroupId,
  recordStatus,
  createDate,
  updateDate,
  createdBy,
  updatedBy,
}:{
  custGroupId: string,
  recordStatus: string,
  createDate: string,
  updateDate: string,
  createdBy: string,
  updatedBy: string,
}) => {
  const details: IDetail[] = [
    {
      label: 'ステータス',
      value: recordStatus,
    },
    {
      label: '作成日',
      value: createDate,
    },
    {
      label: '更新日',
      value: updateDate,
    },
    {
      label: '作成者',
      value: createdBy,      
    },
    {
      label: '更新者',
      value: updatedBy,      
    },
    {
      label: '顧客グループID',
      value: custGroupId,      
    },
  ];

  return (
    <DetailSection 
      title={'管理用'}
      details={details}
    />
  );
};