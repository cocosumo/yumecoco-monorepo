import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const ButtonEdit = ({ 
  link,
}: {
  link: string
}) => {
  return (
    <Stack direction="row" justifyContent={'center'}>
      <Link to={link} target="_blank" rel="noopener noreferrer">
        <Button color='secondary' variant={'text'} startIcon={<EditIcon />}>
          編集
        </Button>
      </Link>
    </Stack>
  );
};