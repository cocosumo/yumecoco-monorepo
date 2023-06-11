import { Divider, List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { UseEstimateByProjIdReturn } from 'kokoas-client/src/hooksQuery';
import { Fragment } from 'react';

export const BranchList = ({
  data,
}: {
  data: UseEstimateByProjIdReturn
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
        width: '150px',
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
            <ListItemButton divider>
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