import { Stack } from '@mui/material';
import { ICustgroups } from 'types';
import { Customers, ResultItemTitle } from './ResultItemTitle';
import { ResultItemRelatedProj } from './ResultItemRelatedProj';

export const SearchResultItemContent = ({
  item,
}:{
  item: ICustgroups,
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
    <Stack >
      <ResultItemTitle 
        customers={customers}
        createDate={item.作成日時.value}
      />

      <ResultItemRelatedProj item={item} />

    </Stack>
  );
};