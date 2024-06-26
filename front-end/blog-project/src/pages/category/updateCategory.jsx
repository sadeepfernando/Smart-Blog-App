import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import React from "react";

const initialFormData = {
  title: "",
  desc: "",
};

const  initialError = {
  title: "",  
};

export default function updateCategory() {

  const [formData, setFormData] = useState(initialFormData);
  const [fornError, setFormError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    if(categoryId){
      const getCategory =  async() => {

        try {
          //api request
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;

          console.log(data);
 
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      };
      getCategory();
    }

  },[categoryId]);

  const handleChange = (e) => { 
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  console.log(categoryId);

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
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="desc"
              className="form-control"
              placeholder="Description"
              value={formData.desc}
              onChange={handleChange}
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
