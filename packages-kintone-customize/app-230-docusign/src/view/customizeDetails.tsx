

import { Box, Button } from '@mui/material';
import { createRoot } from 'react-dom/client';


let container: HTMLDivElement | null = null;


export default async function customizeDetails({
  record,
}: {
  record: DB.SavedRecord
}) {
  // 開発中で、当面残す
  console.log('詳細画面', record);

  if (!container) {
    container = document.querySelector('.gaia-argoui-app-toolbar-statusmenu') as HTMLDivElement;

 
    const root = createRoot(container as Element);

    root.render(
      <Box sx={{
        zIndex: 1000,
      }}
      >
        <Button variant='contained'>
          契約を見る
        </Button>
      </Box>, 
    );

  }
}
