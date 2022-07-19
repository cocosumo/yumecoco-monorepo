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



export const Preview = (form : TypeOfForm) => {

  const { projId, projName, envelopeId, envelopeStatus } = form;
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState('');
  const [envStatus, setEnvStatus] = useState<TEnvelopeStatus>(envelopeStatus);
  const { setSnackState } = useSnackBar();

  const handlePreview = async () => {
    setLoading(true);
    const res = await downloadContract({
      form,
      fileType: 'pdf',
    });

    if (!res) return;
    if (pdfData) URL.revokeObjectURL(pdfData); // free Memory

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

    setEnvStatus(newEnvStatus ?? '');
    if (base64) {
      const blob = base64ToBlob( base64, 'application/pdf' );
      const url = URL.createObjectURL( blob );
      setPdfData(url);
    }
    setLoading(false);
  };

  useEffect(()=>{
    if (!projId || !projName) return;
    handlePreview();
  }, [projId, projName]);

  return (
    <OutlinedDiv label="プレビュー">

      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2} p={2}>
        <Grid item xs={6}>
          <EnvelopeStatus envStatus={envStatus} loading={loading} isVisible={!!projId}/>
        </Grid>
        <Grid item xs={6}>
          <PreviewToolBar {...{ envelopeId, envStatus, loading, projId }} />
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        {!loading && pdfData &&
          <Grid item xs={12}>
            <Paper>
              <embed src={pdfData} width="100%" height='900px' />
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