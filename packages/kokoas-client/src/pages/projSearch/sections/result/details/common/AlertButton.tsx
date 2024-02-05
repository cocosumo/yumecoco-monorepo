import { Button, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import AddAlertIcon from '@mui/icons-material/AddAlert';


export const AlertButton = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {

  return (
    <Tooltip
      title={title}
      placement='top'
    >
      <Button 
        startIcon={<AddAlertIcon />}
        variant='outlined'
        size='small'
      >
        {children}
      </Button>
    </Tooltip>
  );
};
