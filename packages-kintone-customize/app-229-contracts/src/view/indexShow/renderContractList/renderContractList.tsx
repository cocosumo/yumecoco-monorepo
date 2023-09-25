import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormContractList } from './FormContractList';

const queryClient = new QueryClient();


export const renderContractList = () => {
  console.log('FIREs');
  const root = createRoot(document.getElementById('root') as Element);

  root.render(
    <QueryClientProvider client={queryClient}>
      <FormContractList />
    </QueryClientProvider>,
  );
};