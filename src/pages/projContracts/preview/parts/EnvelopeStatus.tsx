import { Grid, Chip, Tooltip } from '@mui/material';
import { jaEnvelopeStatus } from '../../../../lib';

export const EnvelopeStatus = (
  { envStatus, loading } :
  {
    envStatus: TEnvelopeStatus,
    loading: boolean,
  },

) => {
  const { ja, desc } = jaEnvelopeStatus(envStatus);
  const isShow = !loading && ja;

  return (
    <>
      {
        isShow &&
          <Grid item xs={6}>
            <Tooltip title={desc} >
              <Chip label={ja} color="secondary" sx={{ cursor: 'help' }} />
            </Tooltip>

          </Grid>
      }
    </>

  );
};