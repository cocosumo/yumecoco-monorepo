import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const EditButton = ({
  href,
}:{
  href?: string
}) => {
  return (
    <Link 
      to={href || ''}
      style={{
        alignSelf: 'flex-end',
      }}
      
    >
      <Button 
        startIcon={<EditIcon />}
        variant='outlined'
        disabled={!href}
      >
        編集
      </Button>
    </Link>

  );
};