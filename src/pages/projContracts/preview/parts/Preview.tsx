import {  Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { OutlinedDiv } from '../../../../components/ui/containers';

import { SendContract } from './SendContract';
import { DownloadContract } from './DownloadContract';
//import { previewContract, TPreviewResp } from '../api/docusign/previewContract';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../../../hooks';
import { Loading } from './Loading';
//import { useField } from 'formik';
//import { getFieldName } from '../form';
import { downloadContract } from '../api/docusign/downloadContract';



function base64ToBlob( base64 : string, type = 'application/octet-stream' ) {
  const binStr = window.atob( base64 );
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  return new Blob( [ arr ], { type: type } );
}

export const Preview = ({
  projId,
  envelopeId,
} : {
  projId: string
  envelopeId: string,
}) => {
  const [loading, setLoading] = useState(false);
  //const [previewUrl, setPreviewUrl] = useState('');
  const [pdfData, setPdfData] = useState('');
  const [envStatus, setEnvStatus] = useState('');
  const { setSnackState } = useSnackBar();
  //const [,,helper] = useField(getFieldName('dsEnvIdUkeoi'));



  const handlePreview = async () => {
    setLoading(true);
    const res = await downloadContract(projId, 'pdf');

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

    setEnvStatus(res.status);

    const blob = base64ToBlob( base64, 'application/pdf' );
    const url = URL.createObjectURL( blob );
    setPdfData(url);

    console.log('RUL', url);

    setLoading(false);

  };

  useEffect(()=>{
    if (!projId) return;
    handlePreview();
  }, [projId]);


  return (
    <OutlinedDiv label='プレビュー' >
      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2} p={2}>
        {envelopeId && !loading && envStatus &&
        <Grid item xs={6}>
          <Chip label={envStatus} color="secondary" />
        </Grid>
        }

        <Grid item xs={6}>
          <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
            <DownloadContract projId={projId}/>
            {envStatus == '下書き' &&
            <SendContract
                projId={projId}
                isBusy={loading}
                envelopeId={envelopeId}
              />
            }

          </Stack>
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