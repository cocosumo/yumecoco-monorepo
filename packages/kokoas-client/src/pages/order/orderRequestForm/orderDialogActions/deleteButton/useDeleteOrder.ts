import { useConfirmDialog } from 'kokoas-client/src/hooks';

export const useDeleteOrder = () => {

  
  const { setDialogState } = useConfirmDialog();


  const handleDeleteOrder = () => {

  };

  const handleConfirmDeleteOrder = () => {
    setDialogState({
      open: true,
      title: '削除確認',
      content: '削除するとデータは完全に消え復元できません。削除しますか？',
      handleYes: handleDeleteOrder,
    });
  };

  return {
    handleConfirmDeleteOrder,
  };
};