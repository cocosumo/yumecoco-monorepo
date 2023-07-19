import { Button } from '@mui/material';

export const DeleteButton = ({
  disabled,
}:{
  disabled: boolean,
}) => {
  
  return (
    <Button
      variant='contained'
      color='error'
      disabled={disabled}
    >
      削除
    </Button>
  );
};