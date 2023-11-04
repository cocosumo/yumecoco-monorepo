import { Table } from '@mui/material';
import { ReactNode } from 'react';

export const ProspectContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (

    <Table 
      size='small'
      sx={{
        width: '22%',
      }}
    >
      {children}
    </Table>
  );
};