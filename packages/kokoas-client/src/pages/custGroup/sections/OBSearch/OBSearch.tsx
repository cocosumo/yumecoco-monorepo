import { Button, Stack, Tooltip } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import HelpIcon from '@mui/icons-material/Help';

export const OBSearch = () => {
  const [open, setOpen] = useState(false);
  const { setDialogState } = useConfirmDialog();

  const { 
    formState: {
      isDirty,
    },
  } = useTypedFormContext();

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
        maxWidth: '200px',
      }}
      direction={'row'}
      alignItems={'center'}
    >
      <Button
        variant='outlined'
        color='secondary'
        startIcon={<PersonSearchIcon />}
        onClick={() => {
          if (isDirty) {
            setDialogState({
              open: true,
              title: '保存されていない変更があります。',
              content: '保存されていない変更があります。OBを検索すると、変更内容は破棄されます。',
              willCloseOnYes: true,
              handleYes: handleOpen,
            });
          } else {
            handleOpen();
          }
          
        }}
      >
        OBを検索する
      </Button>
      <Tooltip 
        title='以前登録した顧客を検索し、編集画面に移動します。ただし、契約後、その内容は契約書に反映されません。'
        arrow
      >
        <HelpIcon sx={{
          cursor: 'help',
        }} color={'secondary'}
        />
      </Tooltip>
      <SearchDialog 
        open={open}
        handleClose={handleClose}
      />

    </Stack>
  );
};