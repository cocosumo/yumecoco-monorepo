import { Button, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';

export const SearchButton = () => {
  const {
    handleSubmit,
  } = useFormContext<TypeOfForm>();

  const onSubmit = handleSubmit((data) => {
    // 仮実装、コメントを残します。
    console.log(data);
  });


  return (
    <Tooltip title={'検索'}>
      <Button
        onClick={onSubmit} 
        variant={'outlined'}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
};