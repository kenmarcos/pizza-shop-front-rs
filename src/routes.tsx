import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from '@/pages/app/dashboard'
import { SignIn } from '@/pages/auth/sign-in'

export const router = createBrowserRouter([
  { path: '/sign-in', element: <SignIn /> },
  { path: '/', element: <Dashboard /> },
])
