import { FC } from 'react'
import { Link } from 'react-router-dom'

export const NotFound: FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        voltar para a{' '}
        <Link className="text-sky-500 dark:text-sky-400" to={'/'}>
          Dashboard
        </Link>
      </p>
    </div>
  )
}
