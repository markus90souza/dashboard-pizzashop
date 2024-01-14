import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

export const Dashboard: FC = () => {
  return (
    <>
      <Helmet title="App" />
      <h1>Dashboard</h1>
    </>
  )
}
