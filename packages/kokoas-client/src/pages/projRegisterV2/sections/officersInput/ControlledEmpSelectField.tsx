import { Controller } from 'react-hook-form';
import { KForm, TForm } from '../../schema';
import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks';
import { TAgents } from 'types';
import { getDefaultEmployee } from '../../form';

export const ControlledEmpSelecField = ({
  name,
  index,
  label,
  agentType,
  fields,
  required,
  appendNew,
}:{
  name: KForm,
  index: number,
  label: string,
  agentType: TAgents,
  fields: TForm['yumeAG'],
  required?: boolean,
  appendNew: () => void,
}) => {

  const {
    control,
  } = useTypedFormContext();


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
          isDirty,
        },
      }) => {
        const hasError = Boolean(error) && isDirty;
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

              onChange({
                ...getDefaultEmployee(agentType),
                empId: selectedEmpId,
                empName: newEmpName?.value || '',
                empRole: newEmpRole?.value || '',
              });

              if (index === 0) {
                if (selectedEmpId && fields.length === 1) {
                  appendNew();
                }
              }

            }}
          />);
      }}
    />
  );
};