import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import { useEstimateRecords } from '../../../../../../hooks';
import { EstimatesListItem } from './EstimatesListItem';

export const EstimatesList = ({
  projId,
}: {
  projId: string
}) => {
  const { projEstimateRecords } = useEstimateRecords(projId);


  return (
    <Grid container p={2}>
      {projEstimateRecords
        ?.map((rec) => (
          <Grid
            key={rec.$id.value}
            item
            xs={6}
            spacing={2}
          >
            <EstimatesListItem
              estimateRecord={rec}
            />
          </Grid>
        ))}

    </Grid>

  );
};