import { Button, Stack, Tooltip } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog';

export const OBSearch = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip title='以前登録した顧客を検索し、編集画面に移動します。ただし、契約後、その内容は契約書に反映されません。'>
      <Stack
        spacing={1}
        sx={{
          maxWidth: '300px',
        }}
      >
        <Button
          variant='outlined'
          color='secondary'
          startIcon={<PersonSearchIcon />}
          onClick={handleOpen}
        >
          OBを検索する
        </Button>
        <SearchDialog 
          open={open}
          handleClose={handleClose}
        />

      </Stack>
    </Tooltip>
  );
};