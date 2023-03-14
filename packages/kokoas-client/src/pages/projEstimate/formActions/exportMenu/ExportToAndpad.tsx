import { SpeedDialAction, SpeedDialActionProps } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { forwardRef } from 'react';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';

export const ExportToAndpad = forwardRef<HTMLElement, SpeedDialActionProps>((props, ref) => {

  const { getValues } = useFormContext<TypeOfForm>();

  const handleClick = () => {
    const estimateId = getValues('estimateId');
    const endpoint = `${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpad}/${estimateId}`;

    window.open(endpoint, '_blank');
  };

  return (
    <SpeedDialAction
      {...props}
      ref={ref}
      icon={<AndpadLogo size={22} />}
      tooltipTitle={'アンドパッド形式'}
      onClick={handleClick}
    />
  );
});

ExportToAndpad.displayName = 'ExportToAndpad';