import { TypeOfForm } from '../form';
import { Preview } from './Preview';

export const PreviewContainer = (form : TypeOfForm) => {

  return (
    <>
      { form.projId && <Preview /> }
    </>
  );
};