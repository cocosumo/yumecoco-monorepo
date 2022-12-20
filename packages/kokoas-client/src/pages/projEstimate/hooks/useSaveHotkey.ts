import { useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TypeOfForm } from '../form';

/**
 * 保存 windows:　crt+s, mac: cmd+s
 */
export const useSaveHotkey = () => {
  const { submitForm, setValues } = useFormikContext<TypeOfForm>();

  const debouncedSave = useMemo(
    () => debounce(() => { // スパム対策
      submitForm();
    }, 800),
    [submitForm],
  );

  useHotkeys('meta+s', (e) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, saveMode: 'temporary' })); // 一時保存に設定
    debouncedSave();
  });

};