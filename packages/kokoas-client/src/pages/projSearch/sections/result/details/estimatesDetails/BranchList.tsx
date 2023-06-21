import { 
  Divider,
  List, 
  ListItem, 
  ListItemButton, 
  ListSubheader,
  Tooltip, 
} from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { IProjestimates } from 'types';
import { ListItemLayout } from './ListItemLayout';
import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { green } from '@mui/material/colors';

export const BranchList = ({
  records,
  handleSetIndex,
  selectedIndex,
  projId,
}: {
  records?: IProjestimates[],
  handleSetIndex: (idx: number) => void,
  selectedIndex: number,
  projId: string,
}) => {
  const { data: recContracts } = useContractsByProjIdV2(projId);


  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: '100%',
        overflowY: 'auto',
        minWidth: '155px',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
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

      {records?.map(({ uuid, $id, dataId, 作成日時: createDate }, index) => {

        const hasContract = recContracts?.some(({ projEstimateId }) => projEstimateId.value === uuid.value );

        return (
          <Tooltip key={uuid?.value || $id.value} title={hasContract ? '契約有ります' : ''}>
            <ListItem disablePadding>
              <ListItemButton 
                divider
                onClick={() => handleSetIndex(index)}
                selected={selectedIndex === index}
                sx={{
                  bgcolor: hasContract ? green[50] : undefined,
                }}
              >
                <ListItemLayout 
                  createDate={`${parseISOTimeToFormat(createDate.value, 'yy/MM/dd')}`}
                  branchNum={dataId.value.split('-').at(-1)}
                />
             
              </ListItemButton>
            </ListItem>
          </Tooltip>
        );
      })}

    </List>
  );
};