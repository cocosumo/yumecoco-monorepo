
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjSearchField } from './ProjSearchField';

export default async function render(record: DB.SavedRecord) {

  const root = createRoot(kintone.app.record.getSpaceElement('spaceProjName') as Element);

  const queryClient = new QueryClient();

  const {
    projName,
    systemId,
  } = record;

  
  root.render(
    <QueryClientProvider client={queryClient}>
      <ProjSearchField initialValue={{
        label: projName.value,
        id: systemId.value,
        projStatus: '',
      }}
      />
    </QueryClientProvider>,
  );
}