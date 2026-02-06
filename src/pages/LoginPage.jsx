import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className={styles.page}>
      <LoginForm />
      <p className={styles.link}>
        Nie masz konta? <Link to="/register">Zarejestruj sie</Link>
      </p>
    </div>
  );
}
