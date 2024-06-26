import { Controller } from 'react-hook-form';
import { KForm, TAgent } from '../../schema';
import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { TAgents } from 'types';
import { getDefaultEmployee } from '../../form';
import { useUpdateCommRate } from '../../hooks/useUpdateCommRate';
import { useEffect } from 'react';

export const ControlledEmpSelectField = ({
  name,
  index,
  label,
  agentType,
  required,
}:{
  name: KForm,
  index: number,
  label: string,
  agentType: TAgents,
  required?: boolean }) => {

  const {
    control,
    setValue,
  } = useTypedFormContext();

  const {
    handleUpdateCommRate,
  } = useUpdateCommRate();

  const fieldsValues = useTypedWatch({
    name: name,
  }) as TAgent[];

  useEffect(() => {
    if (fieldsValues.length === 1 && fieldsValues[0].empId !== '') {
      setValue(name, [...fieldsValues, getDefaultEmployee(agentType)], { shouldValidate: true });
    } else if (fieldsValues.length === 2 && fieldsValues.every(({ empId }) => !empId )) {
      setValue(name, [getDefaultEmployee(agentType)]);
    }

  }, [fieldsValues, setValue, name, agentType]);

  return (
    <Controller
      control={control}
      name={`${name as 'cocoAG'}.${index}`}
      render={({
        field:{
          value,
          onChange,
          onBlur,
          ref,
        },
        fieldState: {
          error,
        },
      }) => {
        const hasError = Boolean(error?.message);
        const errorMsg = error?.message || '';

        return (
          <EmployeeSelector 
            label={label}
            value={value.empId as string}
            helperText={errorMsg || value.empRole}
            error={hasError}
            ref={ref}
            onBlur={onBlur}
            required={index === 0 ? required : false}
            onChange={(selectedEmpId, rec) => {
              const {
                役職: newEmpRole,
                文字列＿氏名: newEmpName,
              } = rec || {};

              const newAgent = {
                ...getDefaultEmployee(agentType),
                empId: selectedEmpId,
                empName: newEmpName?.value || '',
                empRole: newEmpRole?.value || '',
              };

              // TODO: refactor this to use setValues and getValues, to remove useEffect
              onChange(newAgent);

              if (agentType === 'yumeAG') {
                handleUpdateCommRate({
                  newYumeAG: {
                    index,
                    value: newAgent,
                  },
                });
              }
   

            }}
          />);
      }}
    />
  );
};