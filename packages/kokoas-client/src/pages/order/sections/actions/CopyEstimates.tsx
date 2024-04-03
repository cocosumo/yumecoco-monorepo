import { Button, Menu, MenuItem } from '@mui/material';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { MouseEvent, useState } from 'react';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';

// 配置は変わるかもしれないので、独立したコンポーネントとして作成する


export const CopyEstimates = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const projId = useTypedWatch({
    name: 'projId',
  }) as TForm['projId'];
  
  const { data, isFetching } = useEstimatesByProjId(projId);

  // WIP 

  return (
    <> 
      <Button
        variant={'outlined'}
        color='secondary'
        onClick={handleClick}
      >
        {'見積から引用'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};


