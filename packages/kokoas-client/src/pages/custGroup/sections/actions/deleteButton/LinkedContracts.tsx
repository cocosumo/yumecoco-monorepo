import { 
  Alert, 
  AlertTitle,
  Button, 
  DialogActions,
  DialogContent, 
  DialogTitle, 
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { useLinkedContracts } from '../../../hooks/useLinkedContracts';
import { EnvStatusChip } from './EnvStatusChip';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { DateChip } from './DateChip';
import { CustomChip } from './CustomChip';




// {`${pages.projContractPreviewV2}?${generateParams({ contractId: contract.uuid.value })}`}

const LinkedContractsList = () => {

  const { data = [] } = useLinkedContracts();
  
  console.log(data.length, 'data.length');
  
  return (
    <List
      sx={{
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      {data
        .sort((a, b) => {
          return Number(b.totalContractAmt.value) - Number(a.totalContractAmt.value);
        })
        .map((contract, idx) => {
          return (
            <ListItemButton
              key={contract.uuid.value}
              component={'a'}
              href={`#${pages.projContractPreviewV2}?${generateParams({ contractId: contract.uuid.value })}`}
              target='_blank'
              rel='noopener noreferrer'
            >

              <ListItemIcon>
                {idx + 1}
              </ListItemIcon>

              <ListItemText 
                disableTypography
                primary={`${Number(contract.totalContractAmt.value).toLocaleString()} 円`}
                secondary={(
                  <Stack
                    direction='row'
                    spacing={0.5}
                    py={0.5}
                  >
                    <EnvStatusChip 
                      envStatus={contract.envelopeStatus.value}
                    />
                    <DateChip 
                      dateStr={contract.contractDate.value}
                    />
                    <CustomChip 
                      label={contract.contractType.value}
                      color='secondary'
                      variant='outlined'
                    />

                  </Stack>
                )}
              />
 
            </ListItemButton>
           
        
          );
        })}

    </List>);
};


export const LinkedContracts = ({
  handleClose,
}:{
  handleClose: () => void,
}) => {
  return (
    <>
      <DialogTitle>
        {'削除出来ません'}
      </DialogTitle>
      <DialogContent
        sx={{
          overflow: 'hidden',
          px: 0,
        }}
      >
        <Alert severity='warning'>
          <AlertTitle>
            {'顧客に紐づいている契約があります'}
          </AlertTitle>
          {'契約を削除してから顧客を削除してください。'}
        </Alert>

        <LinkedContractsList />

        
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          分かりました
        </Button>
      </DialogActions>
    </>
  );
};