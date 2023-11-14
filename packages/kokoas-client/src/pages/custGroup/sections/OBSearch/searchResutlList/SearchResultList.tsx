import { ICustgroups } from 'types';
import { SearchResultItem } from './SearchResultItem';
import { RadioGroup } from '@mui/material';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box } from '@mui/system';

export const SearchResultList = ({
  data = [],
}:{
  data: ICustgroups[],
}) => {

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });


  
  return (
    <Box
      ref={parentRef}
      padding={2}
      borderTop={1}
      borderBottom={1}
      borderColor={'divider'}
      height={400}
      overflow={'auto'}
    >
      <Box
        height={`${rowVirtualizer.getTotalSize()}px`}
        width={'100%'}
        position={'relative'}
        display={'block'}
      >
      
        <RadioGroup>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {

            const item = data[virtualItem.index];
          
            return (
              <SearchResultItem 
                key={virtualItem.key}
                item={item}
                virtualItem={virtualItem}
              />

            );
          })}
      
        </RadioGroup>
      </Box>
    </Box>
    
  );
};