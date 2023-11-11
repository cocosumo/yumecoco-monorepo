import { Button, FormHelperText, Stack } from '@mui/material';
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
      <FormHelperText>
        当面、ココアスで登録されているOBのみ検索できます。
      </FormHelperText>
      <SearchDialog 
        open={open}
        handleClose={handleClose}
      />

    </Stack>
  );
};