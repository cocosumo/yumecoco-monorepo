
import { useState } from 'react';

import { Box, FormControl, Stack, FormHelperText } from '@mui/material/';
import LabeledCheckBox from '../../ui/checkboxes/LabeledCheckBox';

interface AgentsCheckValues {
  [key: string] : boolean
}


const MemoFormAgentCheckBox = () => {

  const [agents, setAgents] = useState<AgentsCheckValues>({
    'ここすも営業': true,
    'ここすも工事': true,
    'ゆめてつAG': true,
  });


  return (
      <FormControl>
        <FormHelperText>{'<通知する担当者を選択してください>'}</FormHelperText>
        <Box pl={2} borderRadius={2} border="1px solid #d4d7d7">
          <Stack direction="row" justifyContent="space-around">
            {Object.entries(agents).map(([key, value]) => {

              return (
                <LabeledCheckBox
                  key={key}
                  label={key}
                  checked={value}
                  setCheckedHandler={()=>setAgents((prev)=> ({ ...prev, [key]: !prev[key] }))}
                />);
            })}

          </Stack>
        </Box>
      </FormControl>
  );

};

export default MemoFormAgentCheckBox;