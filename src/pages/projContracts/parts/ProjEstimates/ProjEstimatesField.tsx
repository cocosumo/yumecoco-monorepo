import { Grid, Grow } from '@mui/material';
import { Box } from '@mui/system';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { SelectProjEstimates } from './SelectProjEstimate';

export const ProjEstimatesField = ({
  projId, status, handleSearchTTClose, handleSearchTTOpen, options,
}: {
  projId: string,
  status: TFormStatus,
  options: OptionNode[]
  handleSearchTTOpen: () => void,
  handleSearchTTClose: () => void
}) => {
  return (

    <Grid item xs={12} md={8} >

      <Grow in={!!projId && status === ''} timeout={1000} mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'relative' }}>
          {!!projId && <SelectProjEstimates {...{ options, status }} />}
        </Box>
      </Grow>

      <Grow in={!projId && status === ''} timeout={1000} mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'relative' }}>
          {!projId &&
          <EmptyBox onMouseEnter={handleSearchTTOpen} onMouseLeave={handleSearchTTClose}>
            工事名で検索してください
          </EmptyBox>}
        </Box>
      </Grow>
    </Grid>
  );
};