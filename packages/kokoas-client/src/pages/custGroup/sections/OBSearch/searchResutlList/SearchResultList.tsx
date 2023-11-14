import { ICustgroups } from 'types';
import { SearchResultItem } from './SearchResultItem';
import { Box } from '@mui/material';

export const SearchResultList = ({
  data = [],
}:{
  data: ICustgroups[],
}) => {
  
  return (
    <Box
      overflow={'auto'}
      px={1}
      borderTop={1}
      borderBottom={1}
      borderColor={'divider'}
    >
      {data.map((item) => {
        return (
          <SearchResultItem 
            key={item.uuid.value}
            item={item}
          />
        );
      })}
      
    </Box>
 
    
  );
};