import { ICustgroups } from 'types';
import { SearchResultItem } from './SearchResultItem';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box } from '@mui/system';
import { List, styled } from '@mui/material';

const OuterScrollableContainer = styled(Box)(({ theme }) => ({
  // calcHeight
  height: 400,
  overflow: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const InnerContainer = styled(List)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
}));

export const SearchResultList = ({
  data = [],
  handleCloseDialog,
}:{
  data: ICustgroups[],
  handleCloseDialog: () => void,
}) => {

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  const items = rowVirtualizer.getVirtualItems();
  
  return (
    <OuterScrollableContainer
      ref={parentRef}
    >
      <InnerContainer
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
        
      >
        {items.map((virtualItem) => {

          const item = data[virtualItem.index];
          
          return (
            
            <SearchResultItem 
              key={virtualItem.key}
              item={item}
              virtualItem={virtualItem}
              handleCloseDialog={handleCloseDialog}
            />

          );
        })}
      

      </InnerContainer>
    </OuterScrollableContainer>
    
  );
};