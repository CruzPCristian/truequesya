import { Outlet } from 'react-router-dom'
import Menu from './Menu'

function Layout() {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
