import { 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListSubheader, 
  Paper, 
} from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { Fragment } from 'react';
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
        height: '60vh',
        overflow: 'auto',
        pt: 0,
        minWidth: '155px',
        position: 'absolute',
        top: 112,
        left: 20,
      }}
      component={Paper}
    >
      <ListSubheader>
        <ListItemLayout 
          createDate={'作成日'}
          branchNum={'枝番'}
        />
      </ListSubheader>
      <Divider />

      {records?.map(({ uuid, $id, dataId, 作成日時: createDate }, index) => (
        <Fragment key={uuid?.value || $id.value}>
          <ListItem disablePadding>
            <ListItemButton 
              divider
              onClick={() => handleSetIndex(index)}
              selected={selectedIndex === index}
            >
              <ListItemLayout 
                createDate={`${parseISOTimeToFormat(createDate.value, 'yyyy/MM/dd')}`}
                branchNum={dataId.value.split('-').at(-1)}
              />
             
            </ListItemButton>
          </ListItem>
        </Fragment>
      ))}

    </List>
  );
};