import { useState, useEffect } from "react";
import Visitors from "./Visitors";
import Modal from "../../shared/components/Modal";
import Spinner from "../../shared/components/Spinner";
import Accept from "../../shared/components/Accept";
import Form from "../Form";
import { lSSave } from "../../helpers/localStorage";
import visitorsAPI from "../../shared/api/api";
import sortByParameter from "../../helpers/sortByParameter";
import styles from "./visitorsTable.module.css";

const initialState = {
  visitors: [],
  id: null,
  loading: false,
  error: null,
  isModalVisible: false,
  isAddFormOpen: true,
  isAcceptNeeded: false,
};

const VisitorsTable = () => {
  const [state, setState] = useState(initialState);
  const {
    visitors,
    id,
    loading,
    error,
    isModalVisible,
    isAddFormOpen,
    isAcceptNeeded,
  } = state;

  const updateTable = async (func, data = null) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const newVisitors = !data ? await func() : await func(data);
      setState((prevState) => {
        if (newVisitors.length === 1) {
          const [{ _id }] = newVisitors;
          const requiredIdx = prevState.visitors.findIndex(
            (visitor) => visitor._id === _id
          );
          if (requiredIdx !== -1) {
            prevState.visitors.splice(requiredIdx, 1, ...newVisitors);
            return {
              ...prevState,
              loading: false,
              ...prevState.visitors,
              error: null,
            };
          }
        }
        return {
          ...prevState,
          loading: false,
          visitors: [...prevState.visitors, ...newVisitors],
          error: null,
        };
      });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    updateTable(visitorsAPI.fetchVisitors);
  }, []);

  const toggleModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  const openAddForm = () => {
    setState((prevState) => ({
      ...prevState,
      isAddFormOpen: true,
      isAcceptNeeded: false,
    }));
    toggleModal();
  };

  const openUpdateForm = async (userData) => {
    lSSave(userData);
    setState((prevState) => ({
      ...prevState,
      isAddFormOpen: false,
      id: userData._id,
      isAcceptNeeded: false,
    }));
    toggleModal();
  };

  const addNewVisitor = async (data) => {
    toggleModal();
    updateTable(visitorsAPI.fetchNewVisitor, data);
  };

  const updateVisitor = async (userData) => {
    toggleModal();
    const data = { id, ...userData };
    updateTable(visitorsAPI.updateVisitor, data);
  };

  const deleteClickHandler = async (id) => {
    setState((prevState) => ({
      ...prevState,
      id,
      isAcceptNeeded: true,
    }));
    toggleModal();
  };

  const continueDeletion = async () => {
    toggleModal();
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      await visitorsAPI.deleteVisitor(id);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        id: null,
        isAcceptNeeded: false,
        visitors: prevState.visitors.filter(({ _id }) => _id !== id),
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  const sortBy = (parameter) => {
    const sortedVisitors = sortByParameter(visitors, parameter);
    setState((prevState) => ({ ...prevState, visitors: sortedVisitors }));
  };

  return (
    <>
      {!visitors.length ? (
        <p className={styles.warn}>No visitors</p>
      ) : (
        <table className={styles.table}>
          <caption className={styles.caption}>
            Our visitors ({visitors.length} total)
          </caption>
          <thead className={styles.head}>
            <tr>
              <th onClick={() => sortBy("firstName")}>Visitor's name</th>
              <th onClick={() => sortBy("lastName")}>Visitor's surname</th>
              <th onClick={() => sortBy("createdAt")}>Entry time</th>
              <th>Updating</th>
              <th>Deletion</th>
            </tr>
          </thead>
          <Visitors
            visitors={visitors}
            onUpdateClick={openUpdateForm}
            onDeleteClick={deleteClickHandler}
          />
        </table>
      )}
      <button className={styles.add} type="button" onClick={openAddForm}>
        Add
      </button>
      {loading && <Spinner />}
      {error && <p className={styles.error}>{error}</p>}
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          {isAcceptNeeded ? (
            <Accept onYes={continueDeletion} onNo={toggleModal} />
          ) : (
            <Form
              onSubmit={isAddFormOpen ? addNewVisitor : updateVisitor}
              btnText={isAddFormOpen ? "Add" : "Update"}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default VisitorsTable;
