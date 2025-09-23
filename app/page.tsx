import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <p className={styles.description}>Track and manage your expenses efficiently!</p>

      <Link href="/register" className={styles.button}>
        Get Started
      </Link>
    </main>
  );
}
