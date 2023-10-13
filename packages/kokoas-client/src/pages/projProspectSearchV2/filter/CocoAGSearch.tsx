import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useCocoAG } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { Controller } from 'react-hook-form';


export const CocoAGSearch = () => {
  const { data: cocoAgs } = useCocoAG();
  const {
    control,
  } = useTypedFormContext();


  return (
    <Controller 
      control={control}
      name='cocoAGId'
      render={({ field:{
        onChange,
        ...otherFieldProps
      } }) => {
        return (
          <FormControl 
            size='small' 
            sx={{ width: 200 }}
            
          >
            <InputLabel id="cocoAG">
              ここすも担当者
            </InputLabel>
            <Select
              labelId="cocoAG"
              id="cocoAG"
              label="ここすも担当者"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              {...otherFieldProps}
            >
              <MenuItem
                value={''}
              >
                未設定
              </MenuItem>
              {cocoAgs?.map(({
                uuid: empId,
                文字列＿氏名: empName,
                sort: sortNumber,
                状態: status,
              }) => {
          
                return (
                  <MenuItem 
                    key={empId.value}
                    value={empId.value}
                  >
         
                    <Stack
                      direction={'row'}
                      spacing={2}
                      alignItems={'center'}
                    >
                      <Typography>
                        {empName.value}
                      </Typography>
                      {status.value === '有効' && sortNumber.value && (
                      <Typography color={grey[500]} fontSize={12}>
                        #
                        {sortNumber.value}
                      </Typography>
                      )}
                      {status.value !== '有効' && (
                      <Typography color={grey[500]}>
                        退職者
                      </Typography>
                      )}

                    </Stack>


                  </MenuItem>
                );
              })}

            </Select>
          </FormControl>
        );
      }}
    />
    
    
  );
};  