import { MenuItem, Tooltip  } from '@mui/material';

import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from 'kokoas-client/src/pages/projContractV2/schema';
import { TEnvelopeStatus } from 'types';

/**
 * エンベロープを修正する
 * @see https://support.docusign.com/s/document-item?language=ja&rsc_301=&langSet=1&bundleId=oeq1643226594604&topicId=dxr1578456334187.html&_LANG=jajp
 */
const editableStates: TEnvelopeStatus[] = ['sent', 'created', 'correct'];

export const MenuCorrectContract = () => {
  const [open, setOpen] = useState(false);
  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  }) as TEnvelopeStatus;

  const isEditableState = editableStates.includes(envelopeStatus);

  return (
    <Tooltip title={!isEditableState ? '進捗中の契約のみ修正出来ます' : ''}>
      <div>
        <MenuItem 
          disabled={!isEditableState}
          onClick={() => {
            setOpen(true);
          }}
        >
          修正
        </MenuItem>
      </div>
    </Tooltip>
  );
};