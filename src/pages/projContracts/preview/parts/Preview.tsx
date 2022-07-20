import {  Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../../../hooks';
import { Loading } from './Loading';

import { downloadContract } from '../api/docusign/downloadContract';
import { TypeOfForm } from '../form';
import { base64ToBlob } from '../../../../lib';
import { EnvelopeStatus } from './EnvelopeStatus';
import { PreviewToolBar } from './PreviewToolBar';
import { OutlinedDiv } from '../../../../components/ui/containers';
import { useFormikContext } from 'formik';



export const Preview = () => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { projId, projName, envelopeId, envelopeStatus } = values;
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');
  //const [envStatus, setEnvStatus] = useState<TEnvelopeStatus>(envelopeStatus);
  const { setSnackState } = useSnackBar();

  const handlePreview = async () => {
    setLoading(true);
    const res = await downloadContract({
      form: values,
      fileType: 'pdf',
    });

    if (!res) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl); // free Memory

    const {
      documents = [],
      envelopeStatus: newEnvStatus,
      error,
    } = res;

    if (error || !documents.length) {
      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${res.error}`,
      });
      setLoading(false);
      return;
    }

    const base64 = documents[0]; // Get first document

    setValues({
      ...values,
      envelopeStatus: newEnvStatus ?? envelopeStatus,
    });

    if (base64) {
      const blob = base64ToBlob( base64, 'application/pdf' );
      const url = URL.createObjectURL( blob );
      setPreviewUrl(url);
    }
    setLoading(false);
  };

  useEffect(()=>{
    if (!projId || !projName) return;
    handlePreview();
  }, [projId, projName]);


  console.log(values);
  return (
    <OutlinedDiv label="プレビュー">

      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2} p={2}>
        <Grid item xs={6}>
          <EnvelopeStatus envStatus={envelopeStatus} loading={loading} isVisible={!!projId}/>
        </Grid>
        <Grid item xs={6}>
          <PreviewToolBar {...{ envelopeId, envelopeStatus, loading, projId }} />
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        {!loading && previewUrl &&
          <Grid item xs={12}>
            <Paper>
              <embed src={previewUrl} width="100%" height='900px' />
            </Paper>
          </Grid>
        }

        {loading && projId &&
        <Grid item xs={12}>
          <Loading/>
          <Typography variant="caption">
            書類を作成しています。少々お待ちください。
          </Typography>
        </Grid>
        }

        {loading && !projId &&
        <Grid item xs={12}>
          <Typography variant="caption">
            プロジェクトを選択してください。
          </Typography>
        </Grid>
        }

        {envelopeId &&
        <Grid item xs={12}>
          <Typography variant="caption">
            Envelope Id: {envelopeId}
          </Typography>
        </Grid>
        }

      </Grid>
    </OutlinedDiv>
  );
};