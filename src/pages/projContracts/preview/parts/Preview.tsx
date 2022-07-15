import {  Divider, Grid, Paper, Typography } from '@mui/material';
import { OutlinedDiv } from '../../../../components/ui/containers';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../../../hooks';
import { Loading } from './Loading';

import { downloadContract } from '../api/docusign/downloadContract';
import { TypeOfForm } from '../form';
import { base64ToBlob } from '../../../../lib';
import { EnvelopeStatus } from './EnvelopeStatus';
import { PreviewToolBar } from './PreviewToolBar';

export const Preview = (form : TypeOfForm) => {
  const { projId, envelopeId, envelopeStatus } = form;
  const [loading, setLoading] = useState(false);
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
    if ('error' in res) {
      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${res.error}`,
      });
      setLoading(false);
      return;
    }
    const base64 = res.data;
    setEnvStatus(res?.envelopeStatus ?? '');
    if (base64) {
      const blob = base64ToBlob( base64, 'application/pdf' );
      const url = URL.createObjectURL( blob );
      setPdfData(url);
    }
    setLoading(false);
  };

  useEffect(()=>{
    if (!projId) return;
    handlePreview();
  }, [projId]);

  return (
    <OutlinedDiv label='プレビュー' >
      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2} p={2}>
        <Grid item xs={6}>
          <EnvelopeStatus envStatus={envStatus} loading={loading} />
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

      </Grid>
    </OutlinedDiv>
  );
};