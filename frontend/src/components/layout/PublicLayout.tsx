import { Outlet } from 'react-router-dom'
import { Navbar } from '../common/Navbar'

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
