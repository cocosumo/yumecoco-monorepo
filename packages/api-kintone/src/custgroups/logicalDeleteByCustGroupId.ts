import { saveCustGroup } from './saveCustGroup';

export const logicalDeleteByCustGroupId = (
  custGroupId: string, 
  shouldDelete = true,
) => {
  
  return saveCustGroup({
    custGroupId,
    record: {
      isDeleted: { value: (+shouldDelete).toString() },
    },
  });
};