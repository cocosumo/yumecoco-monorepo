import {  Divider, Grid, Paper, Typography } from '@mui/material';
import { Loading } from './Loading';
import { PreviewToolBar } from '../PreviewToolBar/PreviewToolBar';
import { DocumentsSelect } from './SelectDocuments';
import { RefreshButton } from '../PreviewToolBar/RefreshButton';
import { PreviewContainer } from './PreviewContainer';
import { useContractPreview } from '../../hooks/useContractPreview';



export const Preview = () => {
  const {
    values,
    previewLoading,
    formLoading,
    previewUrl,
  } = useContractPreview();

  const { envelopeId, envelopeStatus, projId, projName } = values;

  return (
    <PreviewContainer>
      <Grid item xs={6}>
        <RefreshButton loading={formLoading} isVisible={!!projId} />
      </Grid>
      <Grid item xs={6}>
        <PreviewToolBar {...{
          envelopeId,
          envelopeStatus,
          loading: formLoading,
          projId,
          projName,
          previewLoading }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {!formLoading && previewUrl &&
      <Grid item xs={12}>
        <Paper>
          <DocumentsSelect />
          <embed src={previewUrl} width="100%" height='900px' />
        </Paper>
      </Grid>}

      {formLoading && projId &&
      <Grid item xs={12}>
        <Loading />
        <Typography variant="caption">
          書類を作成しています。少々お待ちください。
        </Typography>
      </Grid>}

      {formLoading && !projId &&
      <Grid item xs={12}>
        <Typography variant="caption">
          プロジェクトを選択してください。
        </Typography>
      </Grid>}

      {envelopeId &&
      <Grid item xs={12}>
        <Typography variant="caption">
          Envelope Id:
          {' '}
          {envelopeId}
        </Typography>
      </Grid>}

    </PreviewContainer>

  );
};