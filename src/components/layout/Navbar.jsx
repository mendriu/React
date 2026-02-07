import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/dashboard">
          Lista Zakupow
        </Link>

        {user && (
          <div className={styles.right}>
            <span className={styles.user}>{user.email}</span>
            <button className={styles.logoutBtn} onClick={logout}>
              Wyloguj
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
