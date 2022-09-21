import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import { yumecocoDocusign } from '../../../../config/settings';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { generateParams } from '../../../../helpers/url';


export const DownloadContract = ({
  projEstimateId,
} : {
  projEstimateId: string
}) => {

  const basicParams = generateParams({
    projEstimateId,
  });

  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/download?${basicParams}&fileType=xlsx`;

  return (
    <Tooltip title="契約書をダウンロードする" arrow>
      <LoadingButton
        disabled={!projEstimateId}
        loadingPosition="center"
        onClick={() => {
          window.open(endpoint, '_blank');
        }}
      >
        <RiFileExcel2Fill color='green' size={24} />
      </LoadingButton>
    </Tooltip>
  );
};