import { Alert, AlertTitle, Button, DialogContent, List, ListItem } from '@mui/material';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';

export const PreviewContent = ({
  documentB64,
  isLoading,
}: {
  documentB64: string | null, 
  isLoading: boolean,
}) => {
  
  const pdfUrl = `data:application/pdf;base64,${documentB64}`;

  return (
    <DialogContent
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      {isLoading && (<Loading />)}

      {!isLoading && documentB64 && (
        <object 
          data={pdfUrl} 
          type="application/pdf" 
          width="100%"
          height='100%'
        />
      )}

      {!isLoading && !documentB64 && (
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

          当エラーが発生した旨を、お手数ですがシステム開発部門までご連絡ください。
          
        </Alert>  
      )}

    </DialogContent>
  );
};