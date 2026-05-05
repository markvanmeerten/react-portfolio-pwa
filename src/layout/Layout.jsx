import Nav from './Nav'
import './Layout.css'

function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className="layout-content">
        {children}
      </div>
    </>
  )
}

export default Layout
