import { Button } from '@mui/material';
import { useConfirmDialog, useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const NewContractButton = ({
  projId,
  projName,
}:{
  projId: string,
  projName: string,
}) => {
  const navigate = useNavigateWithQuery();
  const {
    setDialogState,
  } = useConfirmDialog();

  const handleNewContract = () => {
    setDialogState({
      open: true,
      title: '新規契約',
      content: `「${projName}」に新規契約を作成しますか？`,
      handleYes: () => {
        navigate('projContractPreviewV2', {
          projId,
        });
      },
    });
  };

  return (
    <Button
      onClick={handleNewContract}
      variant='outlined'
      color='success'
    >
      新規
    </Button>
  );
};