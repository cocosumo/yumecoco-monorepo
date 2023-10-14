import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormSchedule } from './FormSchedule';

const queryClient = new QueryClient();


export const renderSchedule = () => {
  const root = createRoot(document.getElementById('root') as Element);

  root.render(
    <QueryClientProvider client={queryClient}>
      <FormSchedule />
    </QueryClientProvider>,
  );
};