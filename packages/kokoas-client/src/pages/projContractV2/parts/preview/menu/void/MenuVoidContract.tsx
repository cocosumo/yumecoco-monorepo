import { MenuItem, Tooltip  } from '@mui/material';

import { VoidContractDialog } from './VoidContractDialog';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from 'kokoas-client/src/pages/projContractV2/schema';
import { TEnvelopeStatus } from 'types';

/**
 * 無効化（取り下げ）出来ない状態
 * @see 
 */
const terminalStates: TEnvelopeStatus[] = ['voided', 'voiding', 'completed'];

export const MenuVoidContract = () => {
  const [open, setOpen] = useState(false);
  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  }) as TEnvelopeStatus;

  const isTerminalState = terminalStates.includes(envelopeStatus);

  return (
    <>
      <Tooltip title={isTerminalState ? '進捗中の契約は取り下げできません' : ''}>
        <div>
          <MenuItem 
            disabled={isTerminalState}
            onClick={() => {
              setOpen(true);
            }}
          >
            取り下げ
          </MenuItem>
        </div>
      </Tooltip>
      <VoidContractDialog 
        handleClose={()=> setOpen(false)} 
        open={open}
      />
    </>
  );
};