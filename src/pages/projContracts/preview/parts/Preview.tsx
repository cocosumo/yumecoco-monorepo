import { Button, Divider, Grid, Stack, Tooltip } from '@mui/material';
import { OutlinedDiv } from '../../../../components/ui/containers';
import RefreshIcon from '@mui/icons-material/Refresh';
import { SendContract } from './SendContract';
import { DownloadContract } from './DownloadContract';
import { previewContract } from '../api/docusign/previewContract';
import { useState } from 'react';
import Image from 'mui-image';

export const Preview = (props : {
  projId: string
}) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const handlePreview = async () => {
    const res = await previewContract(props.projId);

    /*
      atobでASCIIからBinaryへ変換し、それを1文字ずつUnicodeの数値に変換し、その数字を配列化します。
      この配列をBlobコンストラクタに入れてtypeをExcelの形式で指定します。
      このBlobをcreateObjectURLでブラウザのメモリに展開してaタグを作成し、強制的にクリックしたことにしてダウンロードさせます。
    */
    const binary = window.atob(res);
    
    const decodedArray = new Uint8Array(Array.prototype.map.call(binary, (c: any) => c.charCodeAt()));

    const blob = new Blob([decodedArray], { type: 'image/png' });

   
    const url = window.URL.createObjectURL(blob);
    setPreviewUrl(url);
    /*     const a = document.createElement('a');
    a.href = url;
    a.download = 'a.png';
    a.click(); */
 
  };

  return (
    <OutlinedDiv label='プレビュー' >
      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2}>
        <Grid item xs={6}>
          <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
            <DownloadContract projId={props.projId}/>
            <Tooltip title="作成中　～ラス" arrow>
              <Button variant='outlined' onClick={handlePreview}><RefreshIcon/></Button>
            </Tooltip>
            <SendContract projId={props.projId}/>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs={12}>
          <Image src={previewUrl} shift="bottom" distance={300}/>
          
        </Grid>

      </Grid>

    </OutlinedDiv>
  );
};