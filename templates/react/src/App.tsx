import styles from './app.module.css'
import { Outlet, Link } from 'react-router-dom'
import Logo from 'assets/logo.svg'

function App() {
  return (
    <>
      <header>
        <img alt="React logo" className={styles.logo} src={Logo} width="125" height="125" />

        <div className="wrapper">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default App
