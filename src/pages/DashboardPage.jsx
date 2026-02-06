import { useState, useEffect, useCallback } from 'react';
import { getItems, createItem, deleteItem } from '../api/items';
import ItemForm from '../components/items/ItemForm';
import ItemList from '../components/items/ItemList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      const data = await getItems();
      setItems(data);
      setError('');
    } catch {
      setError('Nie udalo sie pobrac listy');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (payload) => {
    const newItem = await createItem(payload);
    setItems((prev) => [...prev, newItem]);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Lista Zakupow</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Dodaj produkt</h2>
        <ItemForm onSubmit={handleCreate} submitLabel="Dodaj do listy" />
      </section>

      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Produkty ({items.length})
        </h2>
        <ItemList items={items} onDelete={handleDelete} />
      </section>

      {items.length > 0 && (
        <div className={styles.summary}>
          Suma:{' '}
          <strong>
            {items
              .reduce((sum, i) => sum + i.price + (i.tax || 0), 0)
              .toFixed(2)}{' '}
            zl
          </strong>
        </div>
      )}
    </div>
  );
}
