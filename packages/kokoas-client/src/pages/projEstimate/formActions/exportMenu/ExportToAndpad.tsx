import { SpeedDialAction, SpeedDialActionProps } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { forwardRef } from 'react';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { useSnackBar } from 'kokoas-client/src/hooks';

export const ExportToAndpad = forwardRef<HTMLElement, SpeedDialActionProps>((props, ref) => {
  const { setSnackState } = useSnackBar();
  const { getValues } = useFormContext<TypeOfForm>();

  const handleClick = () => {
    const estimateId = getValues('estimateId');
    const endpoint = `${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpad}/${estimateId}`;
    setSnackState({
      open: true,
      severity: 'info',
      autoHideDuration: 5000,
      // 通じるかな？
      message: 'この機能はベータ版です。不具合の報告につきましては、管理者までご連絡いただけますようお願いいたします。', 
    });
    window.open(endpoint);
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