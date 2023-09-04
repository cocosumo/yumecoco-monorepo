import { Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export const AddButton = ({
  onClick,
}:{
  onClick: () => void
}) => {
  return (

    <Tooltip 
      title={'顧客を追加'}
    > 
      <Button
        color='success'
        startIcon={<AddIcon />}
        variant='contained'
        onClick={onClick}
      >
        追加
      </Button>
    </Tooltip>
  
  );
};