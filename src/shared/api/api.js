import axios from "axios";

const instance = axios.create({
  baseURL: "https://visitors-accounting.herokuapp.com/api/visitors",
});

async function fetchVisitors() {
  const { data } = await instance("/");
  return data.visitors;
}

async function deleteVisitor(id) {
  const { data } = await instance.delete(`/${id}`);
  return data.message;
}

async function fetchNewVisitor(userData) {
  const { data } = await instance.post("/", userData);
  return data.visitor;
}

async function updateVisitor(userData) {
  const { id, ...rest } = userData;
  const { data } = await instance.put(`/${id}`, { ...rest });
  return data.visitor;
}

const visitorsAPI = {
  fetchVisitors,
  fetchNewVisitor,
  updateVisitor,
  deleteVisitor,
};

export default visitorsAPI;
