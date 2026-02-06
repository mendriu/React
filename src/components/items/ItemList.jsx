import ItemCard from './ItemCard';
import styles from './ItemList.module.css';

export default function ItemList({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Lista zakupow jest pusta</p>
        <p className={styles.emptyHint}>
          Dodaj pierwszy produkt za pomoca formularza powyzej
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
