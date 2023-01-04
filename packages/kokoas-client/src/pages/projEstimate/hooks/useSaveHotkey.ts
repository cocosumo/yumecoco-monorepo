import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { UseSaveForm } from './useSaveForm';

/**
 * 保存 windows:　crt+s, mac: cmd+s
 */
export const useSaveHotkey = (handleSubmit: UseSaveForm['handleSubmit']) => {

  const debouncedSave = useMemo(
    () => debounce(() => { // スパム対策
      handleSubmit();
    }, 800),
    [handleSubmit],
  );

  useHotkeys('meta+s',
    (e) => {
      e.preventDefault();
      debouncedSave();
    },
    {
      enableOnFormTags: ['INPUT', 'textarea'],
    });

};