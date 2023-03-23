import { ParsedCustGroupReport } from 'types';

export const parseCustGroupDat = async (
  recCustGroupDat: DBCustgroups.SavedData,
): Promise<ParsedCustGroupReport> => {

  const {
    uuid,
    members:{ value: members },    
  } = recCustGroupDat;

  return {
    custGroupId: uuid.value,
    members: members.map(({ value: member }) => {
      return {
        customerName: member.customerName.value,
      };
    }),
  };

};