import { useEffect, useRef } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../form';

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
  const activeElementName = useRef<string>('');
  const {
    reset,
    control,
    setFocus,
  } = formReturn;

  const estimateRevision = useWatch({
    control,
    name: 'estimateRevision',
  });

  useEffect(() => {
    activeElementName.current = document.activeElement?.getAttribute('name') ?? '';
    reset({ ...initialForm });
  }, [reset, initialForm]);

  useEffect(() => {
    /* Return focus after reset */
    if (estimateRevision && activeElementName.current) {
      setFocus(activeElementName.current as KeyOfForm);
    }
  }, [estimateRevision, setFocus]);

};