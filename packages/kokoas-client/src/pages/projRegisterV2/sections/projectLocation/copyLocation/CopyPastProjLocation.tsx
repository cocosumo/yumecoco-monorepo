import { Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext, useTypedWatch } from '../../../hooks/useTypedRHF';
import { addressBuilder } from 'libs';
import { grey } from '@mui/material/colors';

export const CopyPastProjLocation = () => {

  const { setValue } = useTypedFormContext();
  const custGroupId = useTypedWatch({
    name: 'custGroupId',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useProjsByCustGroupId(custGroupId as string);
  
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
          disabled={isLoading || !data}
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
          postal,
          address1,
          address2,
        }) => {

          return (
            <MenuItem 
              key={uuid.value}
              onClick={() => {
                handleClose();
                setValue('postal', postal.value);
                setValue('address1', address1.value);
                setValue('address2', address2.value);
              }}
              sx={{
                display: 'block',
              }}
            >
              <Typography >
                {projName.value}
              </Typography>
              <Typography color={grey[600]}>
                {addressBuilder({
                  postal: postal.value,
                  address1: address1.value,
                  address2: address2.value,
                })}
              </Typography>
            </MenuItem>
          );

        })}
      </Menu>
    </>
  );
};