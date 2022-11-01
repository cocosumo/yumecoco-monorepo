import { FieldHelperProps, FieldHookConfig, useField } from 'formik';
import { useRef } from 'react';

/**
 *
 * If you need stable helper functions from useField, use this,
 * otherwise, don't.
 *
 * Formik V2 has issues with useField where its helper functions
 * do not have stable reference.
 * Formik V3 claims to fix this, but the package is still in
 * unstable alpha stage as of this writing.
 *
 * Deprecate when upgraded to Formik V3. ~ ras 2022.10.28
 *
 * @see https://github.com/jaredpalmer/formik/issues/2268
 * @see https://github.com/jaredpalmer/formik/issues/2268#issuecomment-668112803
 *
 * @param propsOrFieldName
 * @returns Formik's useField with memoized functions
 */
export function useFieldFast<Val = any>(
  propsOrFieldName: string | FieldHookConfig<Val>,
) {
  const [field, meta, helpers] = useField<Val>(propsOrFieldName);

  const actualHelpersRef = useRef<FieldHelperProps<Val>>(helpers);

  // On every render save newest helpers to actualHelpersRef
  actualHelpersRef.current.setValue = helpers.setValue;
  actualHelpersRef.current.setTouched = helpers.setTouched;
  actualHelpersRef.current.setError = helpers.setError;

  const consistentHelpersRef = useRef<FieldHelperProps<Val>>({
    setValue: (...args) => actualHelpersRef.current.setValue(...args),
    setTouched: (value: boolean, shouldValidate?: boolean) =>
      actualHelpersRef.current.setTouched(value, shouldValidate),
    setError: (...args) => actualHelpersRef.current.setError(...args),
  });

  return [field, meta, consistentHelpersRef.current] as const;
}