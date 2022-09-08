

import { useFormikContext } from 'formik';
import {  useState } from 'react';
import { TypeOfForm } from '../../form';
import { ActionButtons } from './ActionButtons';
import { Processing } from './Processing';

/**
 * 要件定義
 * https://trello.com/c/H1CpYO7D
 * */

export const FormActions = () => {

  const { submitForm, isSubmitting } = useFormikContext<TypeOfForm>();
  const  throttle = isSubmitting;
  const handleSave = ()=>{

    submitForm();


  };

  return (
    <>
      <ActionButtons handleSave={handleSave} throttle={throttle}  />
      <Processing throttle={throttle} />
    </>
  );
};