import { 
  Autocomplete, 
  Button, 
  DialogActions, 
  DialogContent, 
  Stack, 
  TextField,
  Typography, 
} from '@mui/material';
import { useDebounceValue } from 'usehooks-ts';
import { useState } from 'react';
import { useAndpadByProjName } from 'kokoas-client/src/hooksQuery';
import { grey } from '@mui/material/colors';
import { SaveProjectData } from 'api-andpad';
import { AndpadProjComparison } from '../../tables/projAndpadComparison/ProjAndpadComparison';
import { EmptyBox } from '../../information';




export const SearchProject = ({
  projId,
  onSelectSystemId,
  onClose,
}:{
  projId: string,
  onSelectSystemId?: (systemId: string) => void,
  onClose: () => void,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<SaveProjectData | null>(null);

  const [debouncedValue] = useDebounceValue(inputValue, 500);

  const { data: options, isLoading } = useAndpadByProjName(debouncedValue, {
    select: (d) => {
      return d.data.objects.map<SaveProjectData>((andpadRecord) => andpadRecord);
    },
  });


  


  return (
    <>
      <DialogContent sx={{ 
        height: '60vh', 
        width: '500px',
        overflow: 'hidden',
      }}
      >
        <Stack 
          pt={2} 
          spacing={2}
          height={'100%'}
        >
          <Autocomplete
            value={value}
            loading={isLoading}
            disablePortal
            id="combo-box-demo"
            options={options ?? []}
            fullWidth
            size='small'
            placeholder='Andpad上の案件名'
            renderInput={(params) => <TextField {...params} label="案件名" />}
            filterOptions={(x) => x}
            onInputChange={(_, val) => setInputValue(val)}
            onChange={(_, val) => setValue(val)}
            noOptionsText={'案件が見つかりません'}
            loadingText={'検索中...'}
            getOptionLabel={(option) => option.案件名 || ''}
            renderOption={(props, { 案件名, システムID }) => (
              <li {...props} key={システムID}>
                <Stack>
                  <div>
                    {案件名}
                  </div>
                  <Typography  
                    variant='caption'
                    color={grey[600]}
                  >
                    {システムID}
                  </Typography>
                </Stack>
              </li>
            )}
          />
 
          {!!value && (
          <AndpadProjComparison 
            projId={projId}
            andpadRecord={value}
          />
          ) } 

          {!value && (
            <EmptyBox height={'100%'}>
              案件を選択したら、
              <br />
              ここにAndpadの情報が表示されます。
            </EmptyBox>
          )}


        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            onSelectSystemId?.(String(value?.システムID));
            onClose();
          }}
        >
          確定
        </Button>
      </DialogActions>
    </>

  );
};