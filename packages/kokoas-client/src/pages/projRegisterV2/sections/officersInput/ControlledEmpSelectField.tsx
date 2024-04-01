import { Controller } from 'react-hook-form';
import { KForm, TForm } from '../../schema';
import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks';
import { TAgents } from 'types';
import { getDefaultEmployee } from '../../form';
import { useUpdateCommRate } from '../../hooks/useUpdateCommRate';

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
  fields: TForm['yumeAG'],
  required?: boolean }) => {

  const {
    control,
  } = useTypedFormContext();

  const {
    handleUpdateCommRate,
  } = useUpdateCommRate();

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