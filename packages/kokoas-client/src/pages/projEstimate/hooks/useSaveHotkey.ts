import { useSnackBar } from 'kokoas-client/src/hooks';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { UseSaveForm } from './useSaveForm';

/**
 * 保存 windows:　crt+s, mac: cmd+s
 */
export const useSaveHotkey = (
  handleSubmit: UseSaveForm['handleSubmit'], 
  options : {
    disabled: boolean
  },
) => {
  const { setSnackState } = useSnackBar();

  const debouncedSave = useMemo(
    () => debounce(  // スパム対策
      async () => {
        await handleSubmit();
      }, 
      800,
    ),
    [handleSubmit],
  );


  useHotkeys('Control+s',
    (e) => {
      e.preventDefault();
      if (options.disabled) {
    
        setSnackState({
          open: true,
          severity: 'warning',
          message: '保存不可',
        });
      } else {
        debouncedSave();
      }

    },
    {
      enableOnFormTags: ['INPUT', 'textarea'],
      enabled: !options.disabled,
      enableOnContentEditable: true,
    },
    [options]);

};