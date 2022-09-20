import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { lSRemoveItem } from "../../../helpers/localStorage";
import styles from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, children }) => {
  const closeHandler = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget) {
        lSRemoveItem();
        onClose();
        return;
      }
      if (code === "Escape") {
        lSRemoveItem();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeHandler);

    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, [closeHandler]);

  return createPortal(
    <div className={styles.backdrop} onClick={closeHandler}>
      <div className={styles.modalBox}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
