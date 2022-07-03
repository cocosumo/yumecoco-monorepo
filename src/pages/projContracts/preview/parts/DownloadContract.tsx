import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { yumecocoDocusign } from '../../../../config/settings';



export const DownloadContract = (props : {
  projId: string
}) => {

  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/send/ukeoi/download?projId=${props.projId}`;
  const handleDownload = async () => {
    
    //await downloadContract(props.projId);
    console.log('DONE');
  };

  return (
    <Tooltip title="契約書を送信する" arrow>

      <LoadingButton
      href={endpoint}
    
      disabled={!props.projId}
 
      onClick={handleDownload}
      variant="outlined"
      loadingPosition="center"
    >
        <DownloadIcon />
      </LoadingButton>
    </Tooltip>
  );
};