import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import React from "react";
import addCategoryValidator from '../../validators/addCategoryValidator';

const initialFormData = {
  title :'',
  desc:''
};

const initialFormError = {
  title:'',
}

export default function newCategory() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <div className="form-container">
        <for className="inner-container">
          <h2 className="form-title"> New Category</h2>

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
              type="text"
              name="desc"
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="from-group">
            <input type="submit" className="button" value='Add' />
          </div>

        </for>
      </div>
    </div>
  );
}
