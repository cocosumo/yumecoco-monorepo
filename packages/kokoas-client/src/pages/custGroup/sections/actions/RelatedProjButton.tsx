import { Badge, Button, Divider, Menu, MenuItem } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { AddProject } from './AddProject';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const RelatedProjButton = ({
  disabled,
  custGroupId,
}:{
  disabled?: boolean,
  custGroupId: string,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useProjsByCustGroupId(custGroupId);
  const navigate = useNavigateWithQuery();


  const projCount = data?.length ?? 0;

  return (
    <>
      <Badge badgeContent={projCount} color="primary">
        <Button
          variant='outlined'
          color='primary'
          startIcon={<ConstructionIcon />}
          disabled={disabled}
          onClick={handleClick}
        >
          関連案件
        </Button>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
        {
          data?.map(({
            uuid,
            projName,
          }) => (
            <MenuItem 
              key={uuid.value}
              onClick={() => {
                navigate('projEditV2', {
                  projId: uuid.value,
                });
              }}
            >
              {projName.value}
            </MenuItem>
          ))
        }
        <Divider />

        <AddProject custGroupId={custGroupId} />
      </Menu>
    </>

  );
};