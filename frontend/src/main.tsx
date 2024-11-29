import { MantineProvider } from '@mantine/core'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import routes from '~react-pages'

import '@mantine/core/styles.css'

export const App = () => <MantineProvider defaultColorScheme="dark">
  <Suspense fallback={<p>Loading...</p>}>
    {useRoutes(routes)}
  </Suspense>
</MantineProvider>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
