import { Divider, List, ListItem, ListItemButton, ListSubheader, Paper } from '@mui/material';
import { ListItemLayout } from './ListItemLayout';
import { IContracts, TEnvelopeStatus } from 'types';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { ContractStatus } from './ContractStatus';

export const ContractList = ({
  records,
  selectedIndex,
  handleSetIndex,
}:{
  records: IContracts[],
  selectedIndex: number,
  handleSetIndex: (idx: number) => void,
}) => {
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: '60vh',
        overflow: 'auto',
        pt: 0,
        minWidth: '200px',
        position: 'absolute',
        top: 100,
        left: 20,
      }}
      component={Paper}
    >
      <ListSubheader sx={{ py: 1 }}>
        <ListItemLayout
          status={'状態'}
          contractDate={'契約日'}
          contractAmount={'税込金額'}
        />
      </ListSubheader>
      <Divider />
      {records?.map(({ uuid, contractDate, envelopeStatus, totalContractAmt }, index) => (

        <ListItem key={uuid.value} disablePadding>
          <ListItemButton 
            divider
            onClick={() => handleSetIndex(index)}
            selected={selectedIndex === index}
          >
            <ListItemLayout 
              status={<ContractStatus envStatus={envelopeStatus.value as TEnvelopeStatus} />}
              contractDate={`${parseISOTimeToFormat(contractDate.value, 'yy/MM/dd')}`}
              contractAmount={(+totalContractAmt.value).toLocaleString()}
            />
             
          </ListItemButton>
        </ListItem>
      ))}
      

    </List>
  );
};