import {  Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { OutlinedDiv } from '../../../../components/ui/containers';

import { SendContract } from './SendContract';
import { DownloadContract } from './DownloadContract';
import { previewContract, TPreviewResp } from '../api/docusign/previewContract';
import { useEffect, useState } from 'react';
import { Image } from 'mui-image';
import { useSnackBar } from '../../../../hooks';
import { Loading } from './Loading';
import { useField } from 'formik';
import { getFieldName } from '../form';


export const Preview = ({
  projId,
  envelopeId,
} : {
  projId: string
  envelopeId: string,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [envStatus, setEnvStatus] = useState('');
  const { setSnackState } = useSnackBar();
  const [,,helper] = useField(getFieldName('dsEnvIdUkeoi'));



  const handlePreview = async () => {
    setLoading(true);
    const res = await previewContract(projId) as TPreviewResp | { error: string };

    if (!res) return;
    if ('error' in res) {
      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${res.error}`,
      });
      setLoading(false);
      return;
    }
    console.log(res.status);
    setEnvStatus(res.status);

    console.log('ENV', res.envelopeId);

    /*
      atobでASCIIからBinaryへ変換し、それを1文字ずつUnicodeの数値に変換し、その数字を配列化します。
      この配列をBlobコンストラクタに入れてtypeをExcelの形式で指定します。
      このBlobをcreateObjectURLでブラウザのメモリに展開してaタグを作成し、強制的にクリックしたことにしてダウンロードさせます。
    */
    const binary = window.atob(res.imgB64);

    const decodedArray = new Uint8Array(Array.prototype.map.call(binary, (c: any) => c.charCodeAt()));

    const blob = new Blob([decodedArray], { type: 'image/png' });

    const url = window.URL.createObjectURL(blob);
    setPreviewUrl(url);
    /*     const a = document.createElement('a');
    a.href = url;
    a.download = 'a.png';
    a.click(); */

    setLoading(false);
    helper.setValue(res.envelopeId);
  };

  useEffect(()=>{
    handlePreview();
  }, [projId]);

  console.log(envelopeId);

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
        {!loading &&
          <Grid item xs={12} >
            <Paper>
              <Image src={previewUrl}/>
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