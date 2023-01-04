import { useFieldArray } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';
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
  const smartHandlers = useSmartHandlers();
  const rowMethods = useManipulateItemRows(fieldArrayHelpers, smartHandlers.handleUpdateSummary);


  return (
    <>
      <EstTHead />
      <EstTableContainer>
        <EstTBody
          isDisabled={isDisabled}
          fieldArrayHelpers={fieldArrayHelpers}
          smartHandlers={smartHandlers}
          {...rowMethods}
        />
      </EstTableContainer>
    </>

  );
};