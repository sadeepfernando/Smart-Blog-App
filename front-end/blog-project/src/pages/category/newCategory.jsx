import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
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

  
  const handleChange = (e)=>{
    setFormData((prev) =>({...prev, [e.target.name]: e.target.value}))
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const errors = addCategoryValidator({title: formData.title});

    if(errors.title){
      setFormError(errors);
    }else{
      try {
        setLoading(true);

        //Api request
        const response = await axios.post('/category', formData);
        const data = response.data;

        toast.success(data.message,{
          position: 'top-right',
          autoClose: 2000,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate('/categories');
        
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false);
        setFormError(initialFormError);
        error.message;
      }

    }
  }



  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>

      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title"> New Category</h2>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              name="desc"
              className="form-control"
              placeholder="Description"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="from-group">
            <input type="submit" className="button" value={`${loading ? "Adding..." : "Add"}`} />
          </div>

        </form>
      </div>
    </div>
  );
}
