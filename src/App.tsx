import '@/styles/globals.css'

import { FC } from 'react'

import { Button } from './components/ui/button'

export const App: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Enviar</Button>
    </div>
  )
}
