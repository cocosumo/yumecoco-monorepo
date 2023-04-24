
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { Main } from './Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 2, // 2 minute
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default async function render(record: DB.SavedRecord) {

  const root = createRoot(kintone.app.record.getSpaceElement('spaceProjName') as Element);
  
  root.render(
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Main record={record} />
    </PersistQueryClientProvider>,
  );
}