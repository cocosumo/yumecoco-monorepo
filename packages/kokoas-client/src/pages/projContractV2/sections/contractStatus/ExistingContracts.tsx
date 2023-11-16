import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Button, Tooltip } from '@mui/material';
import { Info } from '../../parts/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const ExistingContracts = () => {
  
  const [
    projId,
    contractId,
  ] = useTypedWatch({
    name: [
      'projId',
      'contractId',
    ],
  }) as [string, string];

  const { data = [] } = useContractsByProjIdV2(projId);

  const exceptCurrentContract = data?.filter((c) => c.uuid.value !== contractId);

  return (
    <Info
      label='他契約'
      value={exceptCurrentContract.length  
        ? (

          exceptCurrentContract
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
    />
  );
};