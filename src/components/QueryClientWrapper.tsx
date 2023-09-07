"use client"
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

type QueryWrapperProps = {
    children: React.ReactNode 
}

const queryClient = new QueryClient();

const QueryClientWrapper = ({ children } : QueryWrapperProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryClientWrapper;