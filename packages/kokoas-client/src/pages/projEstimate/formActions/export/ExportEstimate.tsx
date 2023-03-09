import { ButtonWithToolTip } from 'kokoas-client/src/components/ui/buttons/ButtonWithSimpleToolTip';
import { BiExport } from '@react-icons/all-files/bi/BiExport';

import { useState } from 'react';

export const ExportEstimate = () => {
  const [open, setOpen] = useState(false);

  return (
    <ButtonWithToolTip 
      title={'出力'}
      variant='outlined'
      size='large'
      onClick={() => setOpen(true)}
    >
      <BiExport size={24} />
    </ButtonWithToolTip>
  );
};