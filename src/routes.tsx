import { createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from '@/layouts'
import { Dashboard } from '@/pages/app/dashboard'
import { Orders } from '@/pages/app/orders'
import { SignIn } from '@/pages/auth/sign-in'
import { SignUp } from '@/pages/auth/sign-up'
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
