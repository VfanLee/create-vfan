import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul style={{ display: 'flex', gap: '10px', justifyContent: 'center', listStyle: 'none' }}>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
