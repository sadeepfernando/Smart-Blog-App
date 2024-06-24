import { useNavigate } from "react-router-dom";


import React from "react";

export default function updateCategory() {
  const navigate = useNavigate();

  return (
    <div>
      <button className="button button-block" onClick={()=> navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Update Category</h2>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Technology"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="desc"
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-group">
            <input type="submit" className="button" value='Update' />
          </div>

        </form>
      </div>
    </div>
  );
}
