import { InputAdornment, Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { TProjRank } from 'types';


const rankDesc : Record<TProjRank, string> = {
  '設契済': '設計契約を済ませている',
  'A': '契約確実',
  'B': '概ね契約',
  'C': '交渉中',
  'D': '未定',
};

const RankDetails = () => {
  
  
  return Object.entries(rankDesc).map(([k, v]) => (
    <Stack
      key={k}
      direction='row'
      spacing={1}
    >
      <Typography 
        width={60}
      >
        {k}
        ：
      </Typography>
      <Typography >
        {v}
      </Typography>
    </Stack>
  ));
};


export const RankHelp = () => {
  
  return (
    <Tooltip title={<RankDetails />}>
      <InputAdornment 
        position='start'
        sx={{
          cursor: 'help',
        }}
      >
        <HelpIcon />
      </InputAdornment>
    </Tooltip>
  );
};