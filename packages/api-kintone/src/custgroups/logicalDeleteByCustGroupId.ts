import { saveCustGroup } from './saveCustGroup';

export const logicalDeleteByCustGroupId = ({
  custGroupId,
  shouldDelete,
}:{
  custGroupId: string, 
  shouldDelete: boolean, // falseの場合、復元
}) => {
  
  return saveCustGroup({
    custGroupId,
    record: {
      isDeleted: { value: (+shouldDelete).toString() },
    },
  });
};