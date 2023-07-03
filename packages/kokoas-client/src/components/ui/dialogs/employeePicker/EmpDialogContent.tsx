import {  
  Checkbox, 
  Divider, 
  FormControlLabel, 
  ListItemText, 
  MenuItem, 
  MenuList, 
  OutlinedInput, 
  Stack,
  Typography, 
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useOptions } from './useOptions';
import { useState } from 'react';


export const EmpDialogContent = ({
  selectedEmpId,
  onSelectEmpId,
}:{
  selectedEmpId: string;
  onSelectEmpId: (empId: string) => void
}) => {
  const [includeResigned, setIncludeResigned] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState([] as string[]);
  const [keyword, setKeyword] = useState('');

  const options = useOptions({
    includeResigned,
    keyword,
    selectedAffiliation,
  });

  
  return (
    <Stack 
      direction={'row'}
      height={'100%'}
      width={'100%'}
    >

      <Stack 
        p={2}
        spacing={1}
        sx={{
          borderRight: '1px solid #ccc',
          height: '100%',
          flex: 0.4,
        }}
      >
        <OutlinedInput 
          size='small'
          placeholder='部分検索'
          onChange={(e) => setKeyword(e.target.value)}
        />
        {['ゆめてつ', 'ここすも' ].map((affiliation) => (
          <FormControlLabel 
            control={(<Checkbox checked={selectedAffiliation.includes(affiliation)} />)} 
            label={affiliation} 
            key={affiliation} 
            onChange={(_, checked) => {
              if (checked) {
                setSelectedAffiliation([...selectedAffiliation, affiliation]);
              } else {
                setSelectedAffiliation(selectedAffiliation.filter((aff) => aff !== affiliation));
              }
            }}
          />
        ))}
        <Divider />
        <FormControlLabel 
          control={(<Checkbox checked={includeResigned} />)} 
          onChange={(_, checked) => setIncludeResigned(checked)}
          label={'退職者を表示'} 
        />
      </Stack>

      <MenuList 
        sx={{
          flex: 0.7,
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        {options.map(({
          empId,
          empName,
          sortNumber,
          isResigned,
        }) => {
          return (
            <MenuItem 
              key={empId}
              selected={selectedEmpId === empId}
              onClick={() => onSelectEmpId(empId)}
            >
              <ListItemText>
                <Typography 
                  component={'span'}
                >
                  {empName}
                </Typography>
                
                <Typography 
                  component={'span'} 
                  color={grey[500]}
                  ml={1}
                >
                  {!!sortNumber && `#${sortNumber} `}
                  {isResigned && '(退職者)'}
                </Typography>
              </ListItemText>
            </MenuItem>
          );
        })}

      </MenuList>

    </Stack>
  );
};