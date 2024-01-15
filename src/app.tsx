import '@/styles/globals.css'

import { FC } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from './providers/theme-provider'
import { router } from './routes'

export const App: FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="@pizzashop:theme">
        <Toaster richColors />
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
