import { Link } from 'react-router-dom';
import styles from './ItemCard.module.css';

export default function ItemCard({ item, onDelete }) {
  const totalPrice = item.price + (item.tax || 0);

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        </h3>
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
        <div className={styles.priceRow}>
          <span className={styles.price}>{item.price.toFixed(2)} zl</span>
          {item.tax > 0 && (
            <span className={styles.tax}>+ {item.tax.toFixed(2)} zl VAT</span>
          )}
          {item.tax > 0 && (
            <span className={styles.total}>= {totalPrice.toFixed(2)} zl</span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <Link className={styles.editBtn} to={`/items/${item.id}`}>
          Edytuj
        </Link>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(item.id)}
        >
          Usun
        </button>
      </div>
    </div>
  );
}
