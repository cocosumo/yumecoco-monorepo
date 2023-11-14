import { Stack } from '@mui/material';
import { ICustgroups } from 'types';
import { ResultItemTitle } from './ResultItemTitle';

export const SearchResultItemContent = ({
  item,
}:{
  item: ICustgroups,
}) => {
  const custNames = item.members.value.map((member) => {
    return member.value.customerName.value;
  }).join('、');


  return (
    <Stack
      spacing={2}
    >
      <ResultItemTitle 
        custNames={custNames}
        createDate={item.作成日時.value}
      />
    </Stack>
  );
};