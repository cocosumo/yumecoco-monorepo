
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { ProjSearchField } from './ProjSearchField';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default async function render(record: DB.SavedRecord) {

  const root = createRoot(kintone.app.record.getSpaceElement('spaceProjName') as Element);


  const {
    projName,
    systemId,
  } = record;

  
  root.render(
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ProjSearchField initialValue={{
        label: projName.value,
        id: systemId.value,
        projStatus: '',
      }}
      />
    </PersistQueryClientProvider>,
  );
}