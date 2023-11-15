import { ListItemButton, Stack, styled } from '@mui/material';
import { ICustgroups } from 'types';

import { VirtualItem } from '@tanstack/react-virtual';
import { Customers, ResultItemTitle } from './ResultItemTitle';
import { ResultItemRelatedProj } from './ResultItemRelatedProj';

const ItemContainer = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SearchResultItem = ({
  item,
  virtualItem,
}:{
  item: ICustgroups,
  virtualItem: VirtualItem,
}) => {

  const customers: Customers = item.members.value
    .map(({ value: member }) => {
      return {
        custId: member.custId.value,
        custName: member.customerName.value,
        custKana: member.custNameReading.value,
      };
    });

  return (
    <ItemContainer
      data-index={virtualItem.index}
      style={{
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
    >
      <Stack>
        <ResultItemTitle 
          customers={customers}
        />
        <ResultItemRelatedProj item={item} />
      </Stack>


    </ItemContainer>
   

  );
};