import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, updateItem, deleteItem } from '../api/items';
import ItemForm from '../components/items/ItemForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './ItemDetailPage.module.css';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getItem(id)
      .then(setItem)
      .catch(() => setError('Nie znaleziono produktu'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await updateItem(id, payload);
    setItem(updated);
    navigate('/dashboard');
  };

  const handleDelete = async () => {
    await deleteItem(id);
    navigate('/dashboard');
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>{error}</div>
        <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
          Wrocdo listy
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edytuj produkt</h1>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Usun produkt
        </button>
      </div>

      <ItemForm
        initialValues={item}
        onSubmit={handleUpdate}
        onCancel={() => navigate('/dashboard')}
        submitLabel="Zapisz zmiany"
      />
    </div>
  );
}
