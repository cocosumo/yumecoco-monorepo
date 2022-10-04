import {  CardContent, Chip, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEstimateRecords } from '../../../../../../hooks/';
import { EstimatesListItem } from './EstimatesListItem';
import { EstimateButton } from './EstimateButton';

export const EstimatesList = ({
  projId,
}: {
  projId: string
}) => {
  const { projEstimateRecords } = useEstimateRecords(projId);

  return (
    <CardContent sx={{ width: '60%' }}>
      <Typography color={grey[600]} width={'100%'}
        textAlign="center"
        mb={2}
        component="div"
      >
        見積リスト
        {' '}
        <Chip size="small" label={`${projEstimateRecords?.length}`} />
      </Typography>
      <Grid container spacing={2}
        justifyContent="center"
      >
        {projEstimateRecords
          ?.map((rec) => (
            <Grid
              key={rec.$id.value}
              item
              xs={6}
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