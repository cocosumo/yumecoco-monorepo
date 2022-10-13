import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

    },
  },
});

export const QueryContext = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

};