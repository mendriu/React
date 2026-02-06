import { useState, useEffect } from 'react';
import styles from './ItemForm.module.css';

const emptyValues = { name: '', description: '', price: '', tax: '' };

export default function ItemForm({ initialValues, onSubmit, onCancel, submitLabel = 'Dodaj' }) {
  const [values, setValues] = useState(emptyValues);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name || '',
        description: initialValues.description || '',
        price: initialValues.price != null ? String(initialValues.price) : '',
        tax: initialValues.tax != null ? String(initialValues.tax) : '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const price = parseFloat(values.price);
    if (isNaN(price) || price < 0) {
      setError('Podaj poprawna cene');
      return;
    }

    const tax = values.tax ? parseFloat(values.tax) : 0;
    if (isNaN(tax) || tax < 0) {
      setError('Podaj poprawna wartosc podatku');
      return;
    }

    const payload = {
      name: values.name.trim(),
      price,
      tax: tax || undefined,
      description: values.description.trim() || undefined,
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
      if (!initialValues) setValues(emptyValues);
    } catch (err) {
      setError(err.response?.data?.detail || 'Wystapil blad');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.row}>
        <label className={styles.label}>
          Nazwa *
          <input
            className={styles.input}
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="np. Mleko"
            required
          />
        </label>

        <label className={styles.label}>
          Cena (zl) *
          <input
            className={styles.input}
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </label>

        <label className={styles.label}>
          VAT (zl)
          <input
            className={styles.input}
            name="tax"
            type="number"
            step="0.01"
            min="0"
            value={values.tax}
            onChange={handleChange}
            placeholder="0.00"
          />
        </label>
      </div>

      <label className={styles.label}>
        Opis
        <input
          className={styles.input}
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Opcjonalny opis produktu"
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submitBtn} type="submit" disabled={submitting}>
          {submitting ? 'Zapisywanie...' : submitLabel}
        </button>
        {onCancel && (
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
}
