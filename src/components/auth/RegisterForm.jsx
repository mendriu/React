import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './AuthForm.module.css';

export default function RegisterForm() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hasla nie sa zgodne');
      return;
    }

    setSubmitting(true);
    try {
      await register(username, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Nie udalo sie zarejestrowac');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Rejestracja</h2>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>
        Nazwa uzytkownika
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          minLength={4}
        />
      </label>

      <label className={styles.label}>
        Potwierdz haslo
        <input
          className={styles.input}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={4}
        />
      </label>

      <button className={styles.button} type="submit" disabled={submitting}>
        {submitting ? 'Rejestracja...' : 'Zarejestruj sie'}
      </button>
    </form>
  );
}
