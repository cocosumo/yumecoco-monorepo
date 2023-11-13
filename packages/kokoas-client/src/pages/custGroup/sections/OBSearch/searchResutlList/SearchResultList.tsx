import { Stack } from '@mui/material';
import { ICustgroups } from 'types';
import { SearchResultItem } from './SearchResultItem';

export const SearchResultList = ({
  data = [],
}:{
  data: ICustgroups[],
}) => {
  
  return (
    <Stack
      height={'100%'}
      sx={{
        overflow: 'auto',
      }}
      spacing={1}
      p={1}
      borderTop={1}
      borderBottom={1}
      borderColor='grey.300'
    >
      {data.map((item) => {
        return (
          <SearchResultItem 
            key={item.uuid.value}
            item={item}
          />
        );
      })}

    </Stack>
    
  );
};