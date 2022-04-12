import { useFormikContext, FormikErrors } from 'formik';
import { useEffect } from 'react';
import './scrollToField.css';

export const getFieldErrorNames = (formikErrors: FormikErrors<unknown>) => {
  const transformObjectToDotNotation = (obj: any, prefix = '', result: string[] = []) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (!value) return;

      const nextKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object') {
        transformObjectToDotNotation(value, nextKey, result);
      } else {
        result.push(nextKey);
      }
    });

    return result;
  };

  return transformObjectToDotNotation(formikErrors);
};

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext();

  useEffect(() => {
    if (isValid) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    const element = document.querySelector(
      `input[name='${fieldErrorNames[0]}']`,
    );
    if (!element) return;

    // Scroll to first known error into view
    
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const parentInputEl = element.closest('.MuiFormControl-root');

    if (!parentInputEl) return;

    parentInputEl.classList.add('shakes');

    setTimeout(()=>{
      parentInputEl.classList.remove('shakes');
    }, 1000);

  }, [submitCount]); 

  return null;
};