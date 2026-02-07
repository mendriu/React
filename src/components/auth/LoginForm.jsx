import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './AuthForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Nie udalo sie zalogowac');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Logowanie</h2>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </label>

      <label className={styles.label}>
        Haslo
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className={styles.button} type="submit" disabled={submitting}>
        {submitting ? 'Logowanie...' : 'Zaloguj sie'}
      </button>
    </form>
  );
}
