import { useEffect } from 'react';
import { UseFormReturn, useFormState } from 'react-hook-form';
import { TypeOfForm } from '../form';

/**
 * projIdやestimadeIdが変わったら、データを取得し、initialFormのステートに格納します。
 * 当フックは initialForm　が変わったら、フォームをリセットする。
 *  */
export const useFormReset = ({
  initialForm,
  formReturn,
} : {
  initialForm : TypeOfForm,
  formReturn: UseFormReturn<TypeOfForm>
}) => {

  const {
    reset,
    control,
  } = formReturn;

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    reset({ ...initialForm });
  }, [reset, initialForm]);

  useEffect(() => {
    console.log(isDirty);
  }, [isDirty]);


};