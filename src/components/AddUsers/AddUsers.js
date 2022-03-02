import React, { useState, useEffect } from "react";
import style from "./AddUsers.module.css";
import UsersTable from "./UsersTable";
import { toast } from "react-toastify";
import { addUser, deleteUser, getUsers } from "../../function/admin";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const AddUsers = ({ token }) => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [data, setdata] = useState([]);
  const fetchUsers = () => {
    getUsers().then((res) => {
      setusers(res.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = (id) => {
    deleteUser(id, token)
      .then((res) => {
        toast.success("User Deleted", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchUsers();
      })
      .catch((err) => {
        toast.error("Invalid or Expired token try to Log in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      });
  };
  const createData = () => {
    let rows = [];
    users.map((u) => {
      const { username, mobilenumber, adresse, email, _id } = u;
      rows.push({
        username,
        mobilenumber,
        email,
        adresse,
        delete: (
          <span>
            <AiFillDelete
              style={{ color: "red", fontSize: "17px", cursor: "pointer" }}
              onClick={() => handleDelete(_id)}
            />
          </span>
        ),
      });
    });
    setdata(rows);
  };
  useEffect(() => {
    {
      users && createData();
    }
  }, [users]);
  const initialValues = {
    username: "",
    mobilenumber: "",
    email: "",
    adresse: "",
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Enter Username!";
    }
    if (values.username && !values.username.match(/^[0-9a-zA-Z]+$/)) {
      errors.usernameverification = "Only alphanumeric characters";
    }
    if (!values.mobilenumber) {
      errors.mobilenumber = "Enter Mobile Number!";
    }
    if (values.mobilenumber && values.mobilenumber.length !== 10) {
      errors.mobilenumberverification = " Only 10 digit number!";
    }
    if (!values.email) {
      errors.email = "Enter Email!";
    }
    if (
      values.email &&
      !values.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.emailverfication = "Enter Valid Email!";
    }
    if (!values.adresse) {
      errors.adresse = "Enter Adresse!";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addUser(formValues, token)
        .then((res) => {
          toast.success("User added successfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchUsers();
          setFormValues(initialValues);
          setIsSubmit(false);
        })

        .catch((err) => {
          toast.error("Invalid or Expired token try to Log in", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsSubmit(false);
          navigate("/");
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);
  return (
    <div className={style.container}>
      <div className={style.showusers}>
        <UsersTable users={users} data={data} />
      </div>
      <div className={style.addusers}>
        <h1>Add User</h1>
        <div className="sm_border"></div>

        <div className="login-input">
          <h4>Username </h4>
          <span style={{ color: "#FF4A57" }}>{formErrors.username}</span>
          <span style={{ color: "#FF4A57" }}>
            {formErrors.usernameverification}
          </span>

          <input
            name="username"
            type="text"
            value={formValues.username}
            onChange={(e) => handleChange(e)}
          />

          <h4>Mobile number</h4>
          <span style={{ color: "#FF4A57" }}>{formErrors.mobilenumber}</span>
          <span style={{ color: "#FF4A57" }}>
            {formErrors.mobilenumberverification}
          </span>
          <input
            name="mobilenumber"
            type="number"
            value={formValues.mobilenumber}
            onChange={(e) => handleChange(e)}
          />

          <h4>E-mail</h4>
          <span style={{ color: "#FF4A57" }}>{formErrors.email}</span>
          <span style={{ color: "#FF4A57" }}>
            {formErrors.emailverfication}
          </span>
          <input
            name="email"
            type="email"
            value={formValues.email}
            onChange={(e) => handleChange(e)}
          />

          <h4>Adresse</h4>
          <span style={{ color: "#FF4A57" }}>{formErrors.adresse}</span>

          <input
            name="adresse"
            type="text"
            value={formValues.adresse}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-btn">
          <a onClick={(e) => handleSubmit(e)}>Add User</a>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
