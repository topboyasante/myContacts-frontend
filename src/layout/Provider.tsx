import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type ProviderProps ={
    children:ReactNode
}

const client = new QueryClient()

function Provider({children}:ProviderProps) {
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider