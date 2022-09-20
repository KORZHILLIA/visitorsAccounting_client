import styles from "./accept.module.css";

const Accept = ({ onYes, onNo }) => {
  return (
    <>
      <p className={styles.warn}>Are you shure?</p>
      <div className={styles.wrapper}>
        <button className={styles.yes} type="button" onClick={onYes}>
          Yes
        </button>
        <button className={styles.no} type="button" onClick={onNo}>
          No
        </button>
      </div>
    </>
  );
};

export default Accept;
