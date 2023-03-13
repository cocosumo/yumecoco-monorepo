import { SpeedDialAction, SpeedDialActionProps } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useConvertToAndpadByEstId } from 'kokoas-client/src/hooksQuery';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { forwardRef } from 'react';

export const ExportToAndpad = forwardRef<HTMLElement, SpeedDialActionProps>((props, ref) => {

  const { mutate } = useConvertToAndpadByEstId();

  const { getValues } = useFormContext<TypeOfForm>();

  const handleClick = () => {
    const estimateId = getValues('estimateId');
    mutate(estimateId);
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