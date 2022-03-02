import axios from "axios";

export const login = async (values) => {
  return await axios.post(
    `https://auth-task-jwt.herokuapp.com/api/admin/login`,
    {
      values,
    }
  );
};

export const addUser = async (values, authtoken) => {
  return await axios.post(
    `https://auth-task-jwt.herokuapp.com/api/admin/addUser`,
    { values },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getUsers = async () =>
  await axios.get(`https://auth-task-jwt.herokuapp.com/api/admin/getUsers`);

export const deleteUser = async (userId, authtoken) =>
  await axios.delete(
    `https://auth-task-jwt.herokuapp.com/api/admin/deleteUser/${userId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
