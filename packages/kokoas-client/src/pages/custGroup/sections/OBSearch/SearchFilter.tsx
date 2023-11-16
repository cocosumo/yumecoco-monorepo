import { Badge, Box, Chip, IconButton, Popover, Stack, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { KStatusFilter, TStatusFilter } from './SearchDialogContent';
import { Fragment, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';


export const SearchFilter = ({
  statusFilter,
  onStatusFilterClick,
}:{
  statusFilter: TStatusFilter
  onStatusFilterClick: (status: keyof TStatusFilter) => void,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <Fragment>

      <Badge 
        badgeContent={Object.values(statusFilter).filter((value) => value).length} 
        color='success'
        variant="dot" 
      >
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          size='small'
        >
          <FilterListIcon />
        </IconButton>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >

        <Stack
          spacing={1}
          width={300}
          p={2}
        >
          <Typography>
            絞り込み
          </Typography>
          <Box >
            {Object.entries(statusFilter).map(([key, value]) => (
              <Chip 
                key={key}
                label={key}
                variant={'outlined'}
                onClick={() => onStatusFilterClick(key as KStatusFilter)}
                sx={{
                  m: 0.5,
                  transition: 'all 0.3s ease',

                }}
                icon={(value ? <CheckIcon /> : undefined )}
                color={value ? 'success' : undefined}
                size='small'
              />
            ))}

          </Box>

        </Stack>
      </Popover>
    </Fragment>

  );
};