

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
  const [throttle, setThrottle] = useState(false);
  const { submitForm } = useFormikContext<TypeOfForm>();
  const handleSave = ()=>{
    if (throttle) return;

    setThrottle(true);
    setTimeout(()=>{
      submitForm();
      setThrottle(false);
    }, 1500);

  };

  return (
    <>
      <ActionButtons handleSave={handleSave} throttle={throttle}  />
      <Processing throttle={throttle} />
    </>
  );
};