import React from "react";
import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialFormError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function signUp() {
  const [formData, setFormData] = useState(initialFormData);

  //for error handling
  const [formError, setFormError] = useState(initialFormError);

  //to handle events
  const handleChange = (e) => {
    setFormData((prev) =>({ ...prev, [e.target.name]: e.target.value }));
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">SignUp Form</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Sadeep Fernando"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="SadeepFernando@gmail.com"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="*********"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input type="submit" className="button" value="Signup" />
        </div>
      </form>
    </div>
  );
}
