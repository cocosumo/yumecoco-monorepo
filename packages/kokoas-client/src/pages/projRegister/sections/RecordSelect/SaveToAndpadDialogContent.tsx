import { Alert, Button, DialogContent, Stack } from '@mui/material';
import { SaveProjectData } from 'api-andpad';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { SaveToAndpadDialogData } from './SaveToAndpadDialogData';
import { useNavigate } from 'react-router-dom';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const SaveToAndpadDialogContent = ({
  convertedData,
  isLoading,

}:{
  isLoading: boolean,
  convertedData?: SaveProjectData
}) => {

  const {
    顧客郵便番号: custPostalCode,
    顧客現住所: custAddress,
    顧客管理ID: custGroupId,
    案件管理ID: projId,
  } = convertedData || {};
  
  const navigate = useNavigate();

  return (
    <DialogContent sx={{ height: '90vh' }}>
      <Stack gap={1}>
        {isLoading 
          ?  '少々お待ちください。' 
          : (<Alert severity="info">
            以下の内容でAndpadへ保存されます。
          </Alert>)}
        {!isLoading && !!convertedData && (!custPostalCode || !custAddress) && (
        <Alert 
          severity="warning"
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => navigate(`${pages.custGroupEditV2}?${generateParams({ custGroupId, projId })}`)}
            >
              顧客情報を編集
            </Button>
          }
        >
          顧客の郵便番号または住所が入力されていません。
          
        </Alert>
        )}

      </Stack>


      {isLoading && <Loading /> }
      {!!convertedData && <SaveToAndpadDialogData convertedData={convertedData} />}
    </DialogContent>
  );
};