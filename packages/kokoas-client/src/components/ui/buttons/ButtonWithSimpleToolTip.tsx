import { Button, ButtonProps, Tooltip, TooltipProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

type ButtonWithToolTipProps = ButtonProps & {
  title: ReactNode;
  tooltipProps?: Omit<TooltipProps, 'title'>;
};

/**
 * ツールチップ付きのボタン
 */
export const ButtonWithToolTip = forwardRef<HTMLButtonElement, ButtonWithToolTipProps>((
  {
    title,
    tooltipProps,
    ...buttonProps
  },
  ref,
) => {
  return (
    <Tooltip title={title} {...tooltipProps}>
      <Button ref={ref} {...buttonProps} />
    </Tooltip>
  );
});

ButtonWithToolTip.displayName = 'ButtonWithToolTip';
