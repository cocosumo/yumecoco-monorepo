import { useFieldArray } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { EstTableActions } from './EstTableActions';
import { EstTableContainer } from './EstTableContainer';
import { EstTBody } from './EstTBody';
//import { EstTBody } from './EstTBody';
import { EstTHead } from './EstTHead';

const name : KeyOfForm = 'items';

export const EstTable = ({
  isDisabled,
}: {
  isDisabled: boolean,
}) => {

  const fieldArrayHelpers = useFieldArray<TypeOfForm>({
    name,
  });

  return (
    <>
      <EstTHead />
      <EstTableContainer
        actions={<EstTableActions {...fieldArrayHelpers} />}
      >
        <EstTBody
          isDisabled={isDisabled}
          fieldArrayHelpers={fieldArrayHelpers}
        />
      </EstTableContainer>
    </>

  );
};