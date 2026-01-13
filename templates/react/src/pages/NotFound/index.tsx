import styles from './index.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className={styles.notFound}>
      <h1>404 - Not Found</h1>
      <Link to="/">回到首页</Link>
    </main>
  )
}

export default NotFound
