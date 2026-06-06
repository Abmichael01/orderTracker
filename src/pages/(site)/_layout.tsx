import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/Site/Navbar'
import Footer from '../../components/Site/Footer'

export default function SiteLayout() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const sectionId = location.hash.slice(1)
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [location.hash, location.pathname, location.search])

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
