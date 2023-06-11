import { Divider, List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';

export const BranchList = () => {
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: '60vh',
        overflow: 'auto',
        pt: 0,
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

      {Array.from(Array(10).keys()).map((i) => (
        <Fragment key={i}>
          <ListItem disablePadding>
            <ListItemButton alignItems='center'>
              {(i + 1).toString().padStart(2, '0')}
            </ListItemButton>
          </ListItem>
          <Divider />
        </Fragment>
      ))}

    </List>
  );
};