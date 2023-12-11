import { 
  Alert, 
  AlertTitle,
  Button, 
  DialogActions,
  DialogContent, 
  DialogTitle, 
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
} from '@mui/material';
import { useLinkedContracts } from '../../../hooks/useLinkedContracts';
import { EnvStatusChip } from './EnvStatusChip';

const ItemContainer = styled(ListItemButton)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));



const LinkedContractsList = () => {

  const { data = [] } = useLinkedContracts();
  
  
  return (
    <List>
      {data.map((contract, idx) => {
        return (
          <ListItem 
            key={contract.uuid.value}
            onClick={() => {
              /* window.open(
                `${kintoneBaseUrl}/k/${contract.app.value}/show#record=${contract.recordId.value}`,
                '_blank',
              ); */
            
            }}
            disablePadding
          >
            <ItemContainer>
              <ListItemIcon>
                {idx + 1}
              </ListItemIcon>
              <ListItemText 
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

                  </Stack>
                )}
              />

            </ItemContainer>
          </ListItem>
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