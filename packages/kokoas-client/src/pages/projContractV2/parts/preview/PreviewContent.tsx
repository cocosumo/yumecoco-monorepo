import { Alert, AlertTitle, Button, DialogContent, List, ListItem } from '@mui/material';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useIsFetching } from '@tanstack/react-query';

export const PreviewContent = ({
  documentB64,
}: {
  documentB64: string | null,  
}) => {
  const isFetching = !!useIsFetching();
  
  const pdfUrl = `data:application/pdf;base64,${documentB64}`;

  return (
    <DialogContent
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      {isFetching && (<Loading />)}

      {!isFetching && documentB64 && (
        <object 
          data={pdfUrl} 
          type="application/pdf" 
          width="100%"
          height='100%'
        />
      )}

      {!isFetching && !documentB64 && (
        <Alert 
          severity={'error'}
          action={(
            <Button
              color={'inherit'}
              size={'small'}
              onClick={() => window.location.reload()}
            >
              更新
            </Button>
          )}
        >
          <AlertTitle>
            プレビューが出来ませんでした。
          </AlertTitle>
          <List sx={{ listStyleType: 'disc' }}>
            <ListItem sx={{ display: 'list-item' }}>
              ブラウザを更新(F5)してください。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              メールに電子契約書が届いているか確認してください。
            </ListItem>

          </List>

          当エラーの再現性について、おかけしますが、システム開発部門にご連絡ください。
          
        </Alert>  
      )}

    </DialogContent>
  );
};