import { saveRecord } from '../common/saveRecord';
import { APPIDS } from './../config';
import { getAgentNames } from './getAgentNames';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

export const saveCustGroup = async (
  {
    record,
    custGroupId,
    revision,
  }:
  {
    record: Partial<CustomerGroupTypes.SavedData>, 
    custGroupId?: string,
    revision?:string,
  },
) => {

  /** Populate aggregate fields. */
  const aggRecord = { ...record }; // avoid argument mutation.
  aggRecord.custNames = { 
    value: record.members?.value
      .map(({ value: { customerName } })=> customerName.value)
      .join(', ') || '', 
  };
  
  aggRecord.cocoAGNames = { 
    value: getAgentNames(record, 'cocoAG'), 
  };
  aggRecord.yumeAGNames = { 
    value: getAgentNames(record, 'yumeAG'), 
  };

  return saveRecord({
    appId: APPIDS.custGroup,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: () => updateRelatedToCustGroup(custGroupId),
  });
};