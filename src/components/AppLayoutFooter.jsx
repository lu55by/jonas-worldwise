import styles from "./AppLayoutFooter.module.css";
export default function AppLayoutFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Worldwise. All rights reserved.{" "}
      </p>
    </footer>
  );
}
