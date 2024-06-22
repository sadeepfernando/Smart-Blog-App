import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import loginValidator from "../../validators/loginValidator";

const initialFormData = {
  email: "",
  password: "",
};

const initialFormError = {
  email: "",
  password: "",
};

export default function login() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      //Api request from back end
      try {
        setLoading(true);

        //Api request
        const response = await axios.post(
          "http://localhost:8000/api/v1/auth/signin",
          formData
        );
        const data = response.data;

        //store response data in the window storage
        window.localStorage.setItem("blogData", JSON.stringify(data));
        
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);

        setLoading(false);
        navigate("/");
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false);
        error.message;
      }
    }
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="sadeepfernando@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <p className="error">{formError.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="*********"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>

        <div className="form-group">
          <input
            type="submit"
            value={`${loading ? "Loading.." : "Login"}`}
            className="button"
          />
        </div>
      </form>
    </div>
  );
}
