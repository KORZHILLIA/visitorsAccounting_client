import { transformDate } from "../../../helpers/transformDate";
import styles from "./visitors.module.css";

const Visitors = ({ visitors, onUpdateClick, onDeleteClick }) => {
  const elements = visitors.map(({ _id, firstName, lastName, createdAt }) => {
    const transformedDate = transformDate(createdAt);
    return (
      <tr key={_id}>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{transformedDate}</td>
        <td>
          <button
            type="button"
            onClick={() =>
              onUpdateClick({ _id, firstName, lastName, createdAt })
            }
          >
            Update
          </button>
        </td>
        <td>
          <button type="button" onClick={() => onDeleteClick(_id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return <tbody className={styles.body}>{elements}</tbody>;
};

export default Visitors;
