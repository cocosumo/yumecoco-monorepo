import { Alert, Button, Stack, Tooltip } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import InfoIcon from '@mui/icons-material/Info';

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
              title: '保存されていない変更があります',
              content: (
                <Alert 
                  severity='warning'
                >
                  遷移後、変更内容は破棄されます。このまま進みますか。
                </Alert>
              ),
              willCloseOnYes: true,
              handleYes: handleOpen,
            });
          } else {
            handleOpen();
          }
          
        }}
      >
        顧客を検索する
      </Button>
      <Tooltip 
        title='以前登録した顧客を検索し、複写する。編集する場合、顧客一覧から検索してください'
        arrow
      >
        <InfoIcon sx={{
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