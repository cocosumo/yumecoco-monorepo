import {  CardContent, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EstimatesListItem } from './EstimatesListItem';
import { EstimateButton } from './EstimateButton';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';

export const EstimatesList = ({
  projId,
}: {
  projId: string
}) => {
  const { data, isFetching } = useEstimatesByProjId(projId);

  const {
    records,
  } = data || {};

  if (isFetching) {
    return <LinearProgress />;
  }

  return (

    <CardContent sx={{ width: '60%' }}>
      <Typography color={grey[600]} width={'100%'}
        textAlign="center"
        mb={2}
        component="div"
      >
        見積リスト
        {' '}
        <Chip size="small" label={`${records?.length}`} />
      </Typography>
      <Grid container spacing={2}
        justifyContent="center"
      >
        {records
          ?.map((rec) => (
            <Grid
              key={rec.$id.value}
              item
              xs={12} md={8} lg={6}
            >
              <EstimatesListItem
                estimateRecord={rec}
              />
            </Grid>
          ))}
        <Grid item xs={12} md={8}>
          <EstimateButton projId={projId} />
        </Grid>
      </Grid>
    </CardContent>

  );
};