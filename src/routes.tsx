import { createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from '@/layouts'
import { Dashboard, Orders } from '@/pages/app'
import { SignIn, SignUp } from '@/pages/auth'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },

      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },

      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
