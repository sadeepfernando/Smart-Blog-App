import React from "react";

export default function signUp() {
  return (
    <div className="form-container">
      <form action="" className="inner-container">
        <h2 className="form-title">SignUp Form</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Sadeep Fernando"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="SadeepFernando@gmail.com"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="*********"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            className="button"
            value="Signup"
          />
        </div>

      </form>
    </div>
  );
}
