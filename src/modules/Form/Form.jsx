import { useState } from "react";
import { lSLoad, lSRemoveItem } from "../../helpers/localStorage";
import styles from "./form.module.css";

const initialState = {
  firstName: "",
  lastName: "",
};

const Form = ({ onSubmit, btnText }) => {
  const lSData = lSLoad();
  const keys = Object.keys(initialState);
  for (let key of keys) {
    if (lSData) {
      initialState[key] = lSData[key];
    } else {
      initialState[key] = "";
    }
  }
  const [state, setState] = useState(initialState);
  const { firstName, lastName } = state;

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({ ...state });
    lSRemoveItem();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="firstName">
          First Name
        </label>
        <input
          className={styles.input}
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={inputHandler}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="lastName">
          Last Name
        </label>
        <input
          className={styles.input}
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={inputHandler}
          required
        />
      </div>
      <button className={styles.btn} type="submit">
        {btnText}
      </button>
    </form>
  );
};

export default Form;
