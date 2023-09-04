import { ListItemIcon, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';


export const AddProject = ({
  custGroupId,
}:{
  custGroupId: string,
}) => {
  const navigate = useNavigateWithQuery();

  return (
    <MenuItem 
      onClick={() => {
        navigate('projEditV2', {
          custGroupId,
        });
      }}
    >
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      工事を追加する
    </MenuItem>
  );
};