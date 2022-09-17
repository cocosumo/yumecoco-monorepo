import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { MenuContainer } from './PreviewMenu/MenuContainer';
import { SendContract } from './SendContract';


export const PreviewToolBar = ({
  projId, envelopeStatus, loading, envelopeId, projName, previewLoading,
}: {
  projId: string,
  projName: string,
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
  previewLoading: boolean,
}) => {

  const voidable = envelopeStatus === 'sent';

  // console.log('loading', loading, voidable, envelopeId, projName, previewLoading);

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>

      {!!projId && <DownloadContract projId={projId} />}

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