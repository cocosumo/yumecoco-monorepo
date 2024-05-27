import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { grey } from '@mui/material/colors';



export const ContractInfo = () => {

  const [
    projId,
  ] = useTypedWatch({
    name: [
      'projId',
    ],
  }) as [string, string[]];

  const { data = [] } = useContractsByProjIdV2(projId);

  console.log('projId 2', projId);

  return (

    <Stack
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      <Stack
        direction={'row'}
        justifyContent={'justifyContent'}
      >
        <Typography variant='body1' component={'span'}>
          {data.length
            ? (
              data
                ?.map((c) => (
                  <Tooltip
                    key={c.uuid.value}
                    title={'新しいタブで開く'}
                  >
                    <Button
                      size='small'
                      variant='outlined'
                      color='secondary'
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        mr: 1,
                        mb: 1,
                      }}
                      href={`#${pages.projContractPreviewV2}?${generateParams({ contractId: c.uuid.value })}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {`${c.contractType.value || '契約'} ${Number(c.totalContractAmt.value).toLocaleString()} 円`}
                    </Button>

                  </Tooltip>
                ))
            )
            : '-'}
        </Typography>
      </Stack>
    </Stack>
  );
};
