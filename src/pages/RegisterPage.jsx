import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className={styles.page}>
      <RegisterForm />
      <p className={styles.link}>
        Masz juz konto? <Link to="/login">Zaloguj sie</Link>
      </p>
    </div>
  );
}
