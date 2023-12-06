import { ListItemButton, Stack, styled } from '@mui/material';
import { ICustgroups } from 'types';

import { VirtualItem } from '@tanstack/react-virtual';
import { Customers, ResultItemTitle } from './ResultItemTitle';
import { ResultItemRelatedProj } from './ResultItemRelatedProj';
import { useNavigateWithQuery, useSnackBar } from 'kokoas-client/src/hooks';
import { ResultItemStatuses } from './ResultItemStatuses';

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
  handleCloseDialog,
}:{
  item: ICustgroups,
  virtualItem: VirtualItem,
  handleCloseDialog: () => void,
}) => {
  const { setSnackState } = useSnackBar();
  const customers: Customers = item.members.value
    .map(({ value: member }) => {
      return {
        custId: member.custId.value,
        custName: member.customerName.value,
        custKana: member.custNameReading.value,
      };
    });

  const navigate = useNavigateWithQuery();
  

  return (
    <ItemContainer
      data-index={virtualItem.index}
      style={{
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
      onClick={() => {
        navigate('custGroupEditV2', {
          custGroupId: item.uuid.value,
          isNew: true,
        });
        setSnackState({
          open: true,
          message: `「${customers?.map(({ custName }) => custName ).join('、') }」を複写しました。`,
          autoHideDuration: 5000,
        });
        handleCloseDialog();
      }}
    >

      <Stack>
        <ResultItemTitle 
          customers={customers}
        />
        <ResultItemRelatedProj item={item} />
        <ResultItemStatuses item={item} />

      </Stack>



    </ItemContainer>
   

  );
};