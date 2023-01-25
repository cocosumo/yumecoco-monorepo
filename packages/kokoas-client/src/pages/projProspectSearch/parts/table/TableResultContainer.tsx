import { Box, Grid, Paper, TableContainer } from '@mui/material';
import { ComponentProps } from 'react';

export const TableResultContainer = (
  props: ComponentProps<typeof Grid>,
) => {
  const {
    children,
    ...otherGridProps
  } = props;
  return (
    <Grid item xs={12} {...otherGridProps}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer >
            {children}
          </TableContainer>
        </Paper>
      </Box>
    </Grid>
  );
};