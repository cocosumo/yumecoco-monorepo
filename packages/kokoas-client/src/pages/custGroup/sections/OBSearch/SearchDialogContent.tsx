import { DialogContent, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { SearchResultList } from './searchResutlList/SearchResultList';
import { SearchTextField } from '../../fields/SearchTextField';
import { SearchFilter } from './SearchFilter';
import { useFilteredCustGroup } from './useFilteredCustGroup';

const initialStatusFilter = {
  契約有: false,
  案件有: false,
  顧客登録のみ: false,
};

export type TStatusFilter = typeof initialStatusFilter;
export type KStatusFilter = keyof TStatusFilter;


export const SearchDialogContent = ({
  handleCloseDialog,
}:{
  handleCloseDialog: () => void,
}) => {
  const [value, setValue] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

  const { 
    data = [], 
    isLoading, 
  } = useFilteredCustGroup({ 
    keyword: value,
    filter: statusFilter,
  });


  const handleDebounceValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handeOnStatusFilterClick = useCallback((status: KStatusFilter) => {
    setStatusFilter((prev) => ({
      ...initialStatusFilter,
      [status]: !prev[status],
    }));
  }, 
  []);


  return (
    <DialogContent
      sx={{
        height: '550px',
        overflow: 'hidden',
        px: 0,
      }}
      
    >
      <Stack 
        mt={2} 
        px={2}
        pb={2}
        direction={'row'}
        alignItems={'start'}
        spacing={1}
      >

        <SearchTextField
          handledDebouncedChange={handleDebounceValue}
          isLoading={isLoading}
        />
        <SearchFilter 
          statusFilter={statusFilter}
          onStatusFilterClick={handeOnStatusFilterClick}
        />
      </Stack>

      <Typography
        sx={{
          px: 2,
          pb: 1,
        }}
        color={'text.secondary'}
        fontSize={'0.75rem'}
      >
        {`検索結果: ${data.length}件`}
      </Typography>
      <SearchResultList 
        data={data}
        handleCloseDialog={handleCloseDialog}
      />

    </DialogContent>
  );
};