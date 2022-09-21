import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { MenuContainer } from './PreviewMenu/MenuContainer';
import { SendContract } from './SendContract';


export const PreviewToolBar = ({
  projId, envelopeStatus, loading, envelopeId, projName, previewLoading,
  projEstimateId,
}: {
  projId: string,
  projName: string,
  projEstimateId: string,
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
  previewLoading: boolean,
}) => {

  const voidable = envelopeStatus === 'sent';

  // console.log('loading', loading, voidable, envelopeId, projName, previewLoading);

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>

      {!!projId && <DownloadContract projEstimateId={projEstimateId} />}

      {!loading && !envelopeStatus && !envelopeId  && !voidable && !!projName && !previewLoading &&
        <SendContract
          projId={projId}
          isBusy={loading}
        />}

      {!loading && !!voidable && !!envelopeId  && !!projName && !previewLoading &&
        <MenuContainer />}
    </Stack>
  );
};