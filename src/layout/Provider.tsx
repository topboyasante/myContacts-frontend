import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


type ProviderProps ={
    children:ReactNode
}

const client = new QueryClient()

function Provider({children}:ProviderProps) {
  return (
    <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Provider