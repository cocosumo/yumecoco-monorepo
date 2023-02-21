import { DialogContent, DialogContentText } from '@mui/material';
import { SaveProjectData } from 'api-andpad';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { SaveToAndpadDialogData } from './SaveToAndpadDialogData';

export const SaveToAndpadDialogContent = ({
  convertedData,
  isLoading,

}:{
  isLoading: boolean,
  convertedData?: SaveProjectData
}) => {

  return (
    <DialogContent sx={{ height: '90vh' }}>
      <DialogContentText>
        {isLoading ?  '少々お待ちください。' : '以下の内容でAndpadへ保存されます。'}
      </DialogContentText>
      {isLoading && <Loading /> }
      {!!convertedData && <SaveToAndpadDialogData convertedData={convertedData} />}
    </DialogContent>
  );
};