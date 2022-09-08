

import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { ActionButtons } from './ActionButtons';
import { Processing } from './Processing';

/**
 * 要件定義
 * https://trello.com/c/H1CpYO7D
 * */

export const FormActions = () => {

  const { submitForm, isSubmitting } = useFormikContext<TypeOfForm>();

  return (
    <>
      <ActionButtons handleSave={submitForm} throttle={isSubmitting}  />
      <Processing throttle={isSubmitting} />
    </>
  );
};