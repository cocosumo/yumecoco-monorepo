import { Collapse, List } from '@mui/material';
import { ReactNode } from 'react';

export const CollapsibleList = (  {
  open,
  children,
}: {
  open: boolean,
  children: ReactNode,
}) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  );
};