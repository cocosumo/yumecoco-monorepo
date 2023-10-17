import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { OtherProjType } from './OtherProjType';
import { convertCommRateByEmployee } from '../../api/convertCommRateByEmployee';
import { convertCommRateByRole } from '../../api/convertCommRateByRole';
import { useUpdateCommRate } from '../../hooks/useUpdateCommRate';
import { ProjTypeHelp } from './projTypeHelp/ProjTypeHelp';

export const ProjectType = () => {
  const { control, setValue, register, getValues } = useTypedFormContext();

  const {
    handleUpdateCommRate,
  } = useUpdateCommRate();

  const { data: projTypeOptions } = useProjTypes({
    select: (d) => d
      ?.map(({
        label,
        projectName,
        uuid,
        commRateByEmpList,
        commRateByRoleList,
        yumeCommFeeRate,
        profitRate,

      }) => ({
        label: projectName.value || label?.value,
        projTypeId: uuid?.value,
        commRateByEmpList,
        commRateByRoleList,
        yumeCommFeeRate,
        profitRate,
      })),
  });

  useEffect(() => {
    register('projTypeName');
  }, [register]);
  

  return (
    
    <Controller 
      control={control}
      name="projTypeId"
      render={({
        field:{
          onBlur,
          onChange,
          value: newValue,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const showError = isTouched && !!error;

        return (
          <Stack
            direction={'row'}
            spacing={2}
            justifyContent={'space-between'}
            width={600}
          >
            <FormControl 
              size='small'
              sx={{
                width: 300,
              }}
              placeholder='工事種別'
              error={showError}
              //disabled={disabled}
              required
            >
              <InputLabel>
                工事種別
              </InputLabel>
              <Select
                value={newValue}
                label="工事種別"
                onBlur={onBlur}
                startAdornment={<ProjTypeHelp />}
                onChange={(e) => {
                  const newProjTypeId = e.target.value;

                  const { 
                    label: newProjTypeName = '',
                    profitRate,

                    // 以下の順番で紹介料を取得する
                    commRateByEmpList,
                    commRateByRoleList,
                  } = projTypeOptions
                    ?.find(({ projTypeId }) => projTypeId === newProjTypeId) || {};

                  const custName = getValues('custName');
                  const hasContract = getValues('hasContract');
                  const newCommRateByEmp = convertCommRateByEmployee(commRateByEmpList);
                  const newCommRateByRole = convertCommRateByRole(commRateByRoleList);


                  setValue('commRateByEmployee', newCommRateByEmp);
                  setValue('projTypeName', newProjTypeName);
                  setValue('commRateByRole', newCommRateByRole);
                  setValue('profitRate', Number(profitRate?.value));
                  
                  if (!hasContract) {
                    // 契約がないときのみ、工事名称を変更する
                    setValue('projName', `${custName}様邸　${newProjTypeName}`);
                  }
                
                  
                  onChange(newProjTypeId);

                  handleUpdateCommRate({
                    newProjTypeId,
                  });
                
                }}
              >
                <MenuItem value="">
                  ---
                </MenuItem>
                {projTypeOptions?.map(({
                  label, 
                  projTypeId,
                }) => {
                  return (
                    <MenuItem key={projTypeId} value={projTypeId}>
                      {label}
                    </MenuItem>
                  );
                })}
    
              </Select>
              <FormHelperText>
                {error?.message}
              </FormHelperText>
            </FormControl>

            
            <OtherProjType />
            
  
          </Stack>
        );

      }}
    />

  );
};