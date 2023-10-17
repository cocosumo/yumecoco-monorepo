import { Button, Stack, TextField } from '@mui/material';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { DevTool } from '@hookform/devtools';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';
import { useStartSearch } from '../hooks/useStartSearch';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { CocoAGSearch } from './CocoAGSearch';


export const Filter = () => {
  const { control, register } = useTypedFormContext();
  const navigate = useNavigate();
  const handleStartSearch = useStartSearch();
  const { setSnackState } = useSnackBar();


  return (
    <Stack 
      spacing={1}
      direction={'row'}
    >
      <Keyword />
      <TextField 
        size="small" 
        label="お客様名"
        placeholder='氏名・シメイ'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleStartSearch();
          }
        }}
        {...register('custName')}
      />
      <CocoAGSearch />
      <SearchButton />
      <FilterButton />
      <Button onClick={() => {
        navigate('');
        setSnackState({
          open: true,
          message: '絞り込みをリセットしました',
          severity: 'info',
        });
      }}
      >
        リセット
      </Button>

      {/* <FilterButton /> */}
      <DevTool control={control} />

    </Stack>
 
  );
};