import { Divider, List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { UseEstimateByProjIdReturn } from 'kokoas-client/src/hooksQuery';
import { Fragment } from 'react';

export const BranchList = ({
  data,
  handleSetIndex,
}: {
  data: UseEstimateByProjIdReturn,
  handleSetIndex: (idx: number) => void,
}) => {
  
  const {
    records,
    calculated,
  } = data || {};

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
      <Typography 
        variant={'caption'}
        color={'GrayText'}
        textAlign={'center'}
        fontWeight={700}
        component={'div'}
        p={1}
        top={0}
        zIndex={50}
        bgcolor={'white'}
        position={'sticky'}
        boxShadow={2}
      >
        枝番
      </Typography>
      <Divider />

      {records?.map(({ uuid, $id }, index) => (
        <Fragment key={uuid?.value || $id.value}>
          <ListItem disablePadding>
            <ListItemButton 
              divider
              onClick={() => handleSetIndex(index)}
            >
              {(index + 1).toString().padStart(2, '0')}
              <Typography 
                variant='caption' 
                width={'100%'} 
                textAlign={'right'}
                whiteSpace={'nowrap'}
              >
                {`${calculated?.[index]?.summary?.totalAmountAfterTax.toLocaleString()} 円`}
                
              </Typography>
            </ListItemButton>
          </ListItem>
        </Fragment>
      ))}

    </List>
  );
};