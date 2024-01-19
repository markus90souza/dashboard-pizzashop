import '@/styles/globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { queryClient } from './lib/react-query'
import { ThemeProvider } from './providers/theme-provider'
import { router } from './routes'

export const App: FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="@pizzashop:theme">
        <Toaster richColors />
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
