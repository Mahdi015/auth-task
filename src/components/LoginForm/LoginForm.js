import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { login } from "../../function/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ settoken }) => {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = (e) => {
    login(formValues)
      .then((res) => {
        if (res.data.ok) {
          settoken(res.data.acsessToken);
          toast.success("Logged In", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/admin");
        }
      })
      .catch((err) => {
        toast.error("Invalid Credentials !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login-content">
        <div className="login-content-header">
          <h1>Admin Authentication</h1>
          <div className="sm_border"></div>
        </div>
        <div className="login-input">
          <h4>E-mail </h4>
          <input
            value={formValues.email}
            name="email"
            type="text"
            onChange={(e) => handleChange(e)}
          />

          <h4>Password</h4>
          <input
            value={formValues.password}
            name="password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-btn">
          <a onClick={(e) => handleSubmit(e)}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
