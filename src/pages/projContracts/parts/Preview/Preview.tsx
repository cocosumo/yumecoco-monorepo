import {  Divider, Grid, Paper, Typography } from '@mui/material';
import { Loading } from './Loading';
import { PreviewToolBar } from '../PreviewToolBar/PreviewToolBar';
import { DocumentsSelect } from './SelectDocuments';
import { RefreshButton } from '../PreviewToolBar/RefreshButton';
import { PreviewContainer } from './PreviewContainer';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useContractPreview } from '../../hooks';



export const Preview = () => {
  const {
    previewUrl,
    previewLoading,
  } = useContractPreview();
  const {
    values,
  } = useFormikContext<TypeOfForm>();

  const { envelopeId, envelopeStatus, projId, projName, projEstimateId } = values;

  return (
    <PreviewContainer>
      <Grid item xs={6}>
        <RefreshButton loading={previewLoading} isVisible={!!projId} />
      </Grid>
      <Grid item xs={6}>
        <PreviewToolBar {...{
          envelopeId,
          envelopeStatus,
          loading: previewLoading,
          projId,
          projName,
          previewLoading,
          projEstimateId,
        }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {!previewLoading && previewUrl &&
      <Grid item xs={12}>
        <Paper>
          <DocumentsSelect />
          <embed src={previewUrl} width="100%" height='900px' />
        </Paper>
      </Grid>}

      {previewLoading && projId &&
      <Grid item xs={12}>
        <Loading />
        <Typography variant="caption">
          書類を作成しています。少々お待ちください。
        </Typography>
      </Grid>}

      {previewLoading && !projId &&
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