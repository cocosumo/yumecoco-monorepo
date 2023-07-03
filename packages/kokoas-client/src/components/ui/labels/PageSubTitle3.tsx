import { Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';

/**
 * Gridではなく、Dividerを利用した見出しです。
 */
export const PageSubTitle3 = (props : {
  label: ReactNode
}) => {
  const {
    label,
  } = props;

  return (

    <Divider textAlign="left">
      <Typography variant="h6">
        {label}
      </Typography>
    </Divider>

  );
};