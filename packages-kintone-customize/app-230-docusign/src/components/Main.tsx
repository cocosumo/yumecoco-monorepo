import { getRecordInstance } from 'api-kintone';
import { AndpadDetails } from './AndpadDetails';
import { ProjSearchField } from './ProjSearchField';

import { atom } from 'jotai';

export const recordAtom = atom(getRecordInstance() as { record: DB.SavedRecord });

export const Main = ({
  record,
}: {
  record: DB.SavedRecord
}) => {
  const {
    projName,
    systemId,
  } = record;

  return (
    <div>
      <ProjSearchField 
        initialValue={{
          label: projName.value,
          id: systemId.value,
          projStatus: '',
        }}
      />
      <AndpadDetails /> 
    </div>
  );
};