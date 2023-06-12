import { Divider, List, ListItem, ListItemButton, Paper, Stack, Typography } from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { Fragment } from 'react';
import { IProjestimates } from 'types';

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
      <Stack 
        color={'GrayText'}
        fontWeight={700}
        component={'div'}
        p={1}
        top={0}
        zIndex={50}
        bgcolor={'white'}
        position={'sticky'}
        boxShadow={2}
        justifyContent={'space-between'}
        direction={'row'}
      >
        <div>
          作成日
        </div>
        <div>
          枝番
        </div>
      </Stack>
      <Divider />

      {records?.map(({ uuid, $id, dataId, 作成日時: createDate }, index) => (
        <Fragment key={uuid?.value || $id.value}>
          <ListItem disablePadding>
            <ListItemButton 
              divider
              onClick={() => handleSetIndex(index)}
              selected={selectedIndex === index}
            >
             
              <Typography 
                variant='caption' 
                width={'100%'} 
                textAlign={'left'}
                whiteSpace={'nowrap'}
              >
                {`${parseISOTimeToFormat(createDate.value, 'yyyy/MM/dd')}`}

              </Typography>
              {dataId.value.split('-').at(-1)}
            </ListItemButton>
          </ListItem>
        </Fragment>
      ))}

    </List>
  );
};