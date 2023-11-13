import { Box, Paper } from '@mui/material';
import { ICustgroups } from 'types';
import { ResultItemTitle } from './ResultItemTitle';

export const SearchResultItem = ({
  item,
}:{
  item: ICustgroups
}) => {
  const custNames = item.members.value.map((member) => {
    return member.value.customerName.value;
  }).join('、');

  return (
    <Box
      component={Paper}
      p={2}
    >
      <ResultItemTitle 
        custNames={custNames}
        createDate={item.作成日時.value}
      />
      
    </Box>
  );
};