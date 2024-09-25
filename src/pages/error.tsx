import { Link, useRouteError } from 'react-router-dom'

export const Error = () => {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oops, algo deu errado...</h1>

      <p className="text-accent-foreground">
        Abaixo você encontra mais detalhes
      </p>

      <pre>{error?.message || JSON.stringify(error)}</pre>

      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link className="text-sky-600 dark:text-sky-400" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
