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
import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useMemo, useState } from 'react';
import { EmpStatus } from 'types';

type Option = {
  empId: string;
  empName: string;
  sortNumber: string;
  affiliation: string;
  isResigned: boolean;
};

export const EmpDialogContent = () => {
  const [includeResigned, setIncludeResigned] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState([] as string[]);
  const [keyword, setKeyword] = useState('');
  const { data } = useAllEmployees();

  const options = useMemo(() => {

    if (!data) return [];

    return data
      .reduce((acc, cur) => {
        const {
          uuid: empId,
          文字列＿氏名: empName,
          氏名ふりがな: empNameKana,
          sort: sortNumber,
          状態: status,
          affiliation: affiliation,
        } = cur;

        if (!includeResigned && (status.value as EmpStatus) !==  '有効') {
          return acc;
        }

        if (keyword && !((empName.value + empNameKana.value).includes(keyword))) {
          return acc;
        }

        if (selectedAffiliation.length && !selectedAffiliation.includes(affiliation.value)) {
          return acc;
        }

        acc.push({
          empId: empId.value,
          empName: `${empName.value}`,
          sortNumber: sortNumber.value,
          isResigned: (status.value as EmpStatus) !==  '有効',
          affiliation: affiliation.value,
        });
        
        return acc;
      }, [] as Option[]);
 
  }, [
    data, 
    includeResigned,
    keyword,
    selectedAffiliation,
  ]);

  
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
          placeholder='社員名を検索'
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
            <MenuItem key={empId}>
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
                  {sortNumber && `#${sortNumber} `}
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