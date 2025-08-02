import { createBrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'

import Layout from '@/components/Layout'
import Home from '@/pages/Home'
const About = React.lazy(() => import('@/pages/About'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
])

export default router
