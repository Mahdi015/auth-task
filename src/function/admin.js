import axios from "axios";

export const login = async (values) => {
  return await axios.post(
    `http://auth-task-jwt.herokuapp.com/api/admin/login`,
    {
      values,
    }
  );
};

export const addUser = async (values, authtoken) => {
  return await axios.post(
    `http://auth-task-jwt.herokuapp.com/api/admin/addUser`,
    { values },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getUsers = async () =>
  await axios.get(`http://auth-task-jwt.herokuapp.com/api/admin/getUsers`);

export const deleteUser = async (userId, authtoken) =>
  await axios.delete(
    `http://auth-task-jwt.herokuapp.com/api/admin/deleteUser/${userId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
