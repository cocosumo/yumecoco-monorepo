import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../../hooks/useTypedRHF';

export const CopyPastProjLocation = () => {
  const custGroupId = useTypedWatch({
    name: 'custGroupId',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useProjsByCustGroupId(custGroupId as string);
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip 
        title="過去の工事情報から住所をコピーする"
        placement='top'
      >
        <Button 
          variant='outlined' 
          startIcon={<ContentCopyIcon />} 
          onClick={handleClick}
        >
          過去の工事
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {data?.map(({
          uuid,
          projName,
        }) => {

          return (
            <MenuItem 
              key={uuid.value}
              onClick={handleClose}
            >
              {projName.value}
            </MenuItem>
          );

        })}
      </Menu>
    </>
  );
};