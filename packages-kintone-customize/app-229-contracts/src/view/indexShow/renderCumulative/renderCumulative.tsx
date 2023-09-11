import { createRoot } from 'react-dom/client';
import { FormCumulative } from './FormCumulative';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export const renderCumulative = () => {
  const root = createRoot(document.getElementById('root') as Element);

  root.render(
    <QueryClientProvider client={queryClient}>
      <FormCumulative />
    </QueryClientProvider>,
  );
};