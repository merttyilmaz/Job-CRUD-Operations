import styles from "../../styles/Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.context}>
        <div className={styles.body}>
          <span>git</span>
          <span>© 2022 Mert Yılmaz</span>
        </div>
      </div>
    </div>
  );
}
