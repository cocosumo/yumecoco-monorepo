import {  Button, CardContent, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { ContractListItem } from './ContractListItem';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { Link } from 'react-router-dom';

export const ContractsList = ({
  projId,
}: {
  projId: string
}) => {
  const { data, isFetching } = useContractsByProjIdV2(projId);


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
        契約リスト
        <Chip size="small" label={`${data?.length}`} />
      </Typography>
      <Grid
        container 
        spacing={2}
        mb={2} 
        justifyContent="center"
      >
        {data
          ?.map((rec) => (
            <Grid
              key={rec.$id.value}
              item
              xs={12} md={8} lg={6}
            >
              <ContractListItem
                record={rec}
              />
            </Grid>
          ))}

      </Grid>
      <Link to={`${pages.projContractPreviewV2}?${generateParams({ projId, menuOpen: +false })}`}>
        <Button 
          variant='outlined' 
          fullWidth
        >
          契約作成
        </Button>
      </Link>
    </CardContent>

  );
};