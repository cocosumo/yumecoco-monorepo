import { 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListSubheader, 
  Paper, 
} from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { IProjestimates } from 'types';
import { ListItemLayout } from './ListItemLayout';
import { useRef } from 'react';

export const BranchList = ({
  records,
  handleSetIndex,
  selectedIndex,
}: {
  records: IProjestimates[],
  handleSetIndex: (idx: number) => void,
  selectedIndex: number,
  
}) => {

  const ref = useRef<HTMLDivElement>(null);


  return (
    <List
      ref={ref}
      sx={{
        bgcolor: 'background.paper',
        height: '100%',
        overflowY: 'auto',
        minWidth: '155px',
      }}
      component={Paper}
    >
      <ListSubheader sx={{ py: 1 }}>
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