
import { useSaveForm } from '../../hooks/useSaveForm';
import { useSaveHotkey } from '../../hooks/useSaveHotkey';
import { FooterActionsContainer } from './FooterActionsContainer';
import { SaveButton } from './SaveButton';

export const FooterActionButtons = () => {

  const { handleSubmit } = useSaveForm();
  useSaveHotkey(handleSubmit, { disabled: false });

  return (
    <FooterActionsContainer>

      <SaveButton />
      {/* TODO: Add more functionalities */}
    </FooterActionsContainer>
 
  );
};