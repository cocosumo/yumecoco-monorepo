import { useFieldArray } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
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

  const rowMethods = useManipulateItemRows(fieldArrayHelpers);

  return (
    <>
      <EstTHead />
      <EstTableContainer
        actions={<EstTableActions {...rowMethods} />}
      >
        <EstTBody
          isDisabled={isDisabled}
          fieldArrayHelpers={fieldArrayHelpers}
          {...rowMethods}
        />
      </EstTableContainer>
    </>

  );
};