import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import React from "react";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  title: "",
  desc: "",
};

const  initialFormError = {
  title: "",  
};

export default function updateCategory() {

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
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

          setFormData({title: data.category.title, desc: data.category.desc})
 
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

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const errors = addCategoryValidator({title: formData.title});

    if(errors.title){
      setFormError(errors);
    }else{
      try {
        setLoading(true);

        //Api request
        const response = await axios.put(`/category/${categoryId}`, formData);
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
      <button className="button button-block" onClick={()=> navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
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
            {formError.title && <p className="error">{formError.title}</p>}
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
            <input type="submit" className="button" value={`${loading? 'Updating...': 'Update'}`} />
          </div>

        </form>
      </div>
    </div>
  );
}
