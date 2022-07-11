import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import { yumecocoDocusign } from '../../../../config/settings';
import { RiFileExcel2Fill } from 'react-icons/ri';


export const DownloadContract = (props : {
  projId: string
}) => {

  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/ukeoi/download?projId=${props.projId}&fileType=xlsx`;
  const handleDownload = async () => {

    //await downloadContract(props.projId);
    console.log('DONE');
  };

  return (
    <Tooltip title="契約書をダウンロードする" arrow>

      <LoadingButton
      href={endpoint}

      disabled={!props.projId}
      onClick={handleDownload}
      loadingPosition="center"
    >
        <RiFileExcel2Fill color='green' size={'2em'} />
      </LoadingButton>
    </Tooltip>
  );
};