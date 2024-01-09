import { 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListSubheader, 
} from '@mui/material';
import { ListItemLayout } from './ListItemLayout';
import { IContracts, TEnvelopeStatus } from 'types';
import { parseISODateToFormat } from 'kokoas-client/src/lib';
import { ContractStatus } from 'kokoas-client/src/components';

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
        height: '100%',
        overflowY: 'auto',
        minWidth: '250px',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <ListSubheader sx={{ py: 1 }}>
        <ListItemLayout
          status={'状態'}
          contractDate={'契約日'}
          contractAmount={'税込金額'}
        />
      </ListSubheader>
      <Divider />


      {records?.map(({ uuid, contractDate, envelopeStatus, totalContractAmt, otherAttachments }, index) => (

        <ListItem key={uuid.value} disablePadding>
          <ListItemButton 
            divider
            onClick={() => handleSetIndex(index)}
            selected={selectedIndex === index}
          >
            <ListItemLayout 
              hasOtherAttachments={otherAttachments?.value.length > 0}
              status={<ContractStatus envStatus={envelopeStatus.value as TEnvelopeStatus} />}
              contractDate={`${parseISODateToFormat(contractDate.value, 'yy/MM/dd')}`}
              contractAmount={(+totalContractAmt.value).toLocaleString()}
            />
             
          </ListItemButton>
        </ListItem>
      ))}
      

    </List>
  );
};