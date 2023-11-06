import { Button, Stack } from '@mui/material';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { DevTool } from '@hookform/devtools';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { CocoAGSearch } from './CocoAGSearch';
import { ControlledTextField } from './fields/ControlledTextField';


export const Filter = () => {
  const { control } = useTypedFormContext();
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();


  return (
    <Stack 
      spacing={1}
      direction={'row'}
    >
      <Keyword />
      <ControlledTextField 
        label='お客様名'
        name='custName'
        placeholder='氏名・シメイ'
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