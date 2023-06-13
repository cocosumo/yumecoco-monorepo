import { 
  Autocomplete, 
  Button, 
  DialogActions, 
  DialogContent, 
  Stack, 
  TextField,
  Typography, 
} from '@mui/material';
import { useDebounce } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { useAndpadByProjName } from 'kokoas-client/src/hooksQuery';
import { grey } from '@mui/material/colors';


interface AutocompleteOption {
  id: string;
  projName: string;
}

export const SearchProject = () => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<AutocompleteOption | null>(null);

  const debouncedValue = useDebounce(inputValue, 500);

  const { data: options, isLoading } = useAndpadByProjName(debouncedValue, {
    select: (d) => {
      return d.data.objects.map<AutocompleteOption>(({
        案件名: projName,
        システムID: systemId,
      }) => {
        return {
          id: String(systemId),
          projName,
        };
      });


    },
  });

  useEffect(() => {
    
    console.log(options);
  }, [options]);

  return (
    <>
      <DialogContent sx={{ 
        height: '60vh', 
        minWidth: '500px',
      }}
      >
        <Stack direction={'row'} spacing={2} pt={2}>
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
            getOptionLabel={(option) => option.projName || ''}
            renderOption={(props, { projName, id }) => (
              <li {...props} key={id}>
                <Stack>
                  <div>
                    {projName}
                  </div>
                  <Typography  
                    variant='caption'
                    color={grey[600]}
                  >
                    {id}
                  </Typography>
                </Stack>
              </li>
            )}
            
          />
        </Stack>

      </DialogContent>
      <DialogActions>
        <Button>
          キャンセル
        </Button>
        <Button
          variant='contained'
        >
          確定
        </Button>
      </DialogActions>
    </>

  );
};