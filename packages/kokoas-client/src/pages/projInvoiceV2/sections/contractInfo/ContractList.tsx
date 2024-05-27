import { Button, Tooltip, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { IContracts } from 'types';



export const ContractList = ({
  contracts,
}: {
  contracts: IContracts[]
}) => {

  return (
    <Typography variant='body1' component={'span'}>
      {contracts.length
        ? (
          contracts
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
    </Typography>);
};
