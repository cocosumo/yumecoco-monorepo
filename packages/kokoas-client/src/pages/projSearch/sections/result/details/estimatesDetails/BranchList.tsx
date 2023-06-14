import { 
  Divider,
  List, 
  ListItem, 
  ListItemButton, 
  ListSubheader, 
} from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { IProjestimates } from 'types';
import { ListItemLayout } from './ListItemLayout';

export const BranchList = ({
  records,
  handleSetIndex,
  selectedIndex,
}: {
  records: IProjestimates[],
  handleSetIndex: (idx: number) => void,
  selectedIndex: number,
  
}) => {



  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: '100%',
        overflowY: 'auto',
        minWidth: '155px',
        pt: 0, // remove default padding
      }}
    >
      <ListSubheader 
        sx={{ 
          py: 1,           
        }}
      >
        <ListItemLayout 
          createDate={'作成日'}
          branchNum={'枝番'}
        />
      </ListSubheader>
      <Divider />

      {records?.map(({ uuid, $id, dataId, 作成日時: createDate }, index) => (

        <ListItem key={uuid?.value || $id.value} disablePadding>
          <ListItemButton 
            divider
            onClick={() => handleSetIndex(index)}
            selected={selectedIndex === index}
          >
            <ListItemLayout 
              createDate={`${parseISOTimeToFormat(createDate.value, 'yy/MM/dd')}`}
              branchNum={dataId.value.split('-').at(-1)}
            />
             
          </ListItemButton>
        </ListItem>
      ))}

    </List>
  );
};