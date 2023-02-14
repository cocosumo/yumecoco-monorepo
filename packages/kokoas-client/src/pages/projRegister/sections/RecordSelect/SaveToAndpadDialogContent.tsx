import { DialogContent, DialogContentText } from '@mui/material';
import { SaveProjectData } from 'api-andpad';

export const SaveToAndpadDialogContent = ({
  andpadProject,
}: {
  andpadProject: SaveProjectData
}) => {

  return (
    <DialogContent>
      <DialogContentText>
        以下の情報が登録されます。
      </DialogContentText>
    </DialogContent>
  );
};