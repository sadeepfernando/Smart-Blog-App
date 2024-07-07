import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

export default function newPost() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        //api request
        const response = await axios.get( `/category?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);

      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const errors = addPostValidator({ title: formData.title, category: formData.category});

    if(errors.title || errors.category){
      setFormError(errors);
    }else{
      try {
        setLoading(true);

        //Api request
        const response = await axios.post('/post', formData);
        const data = response.data;

        toast.success(data.message,{
          position: 'top-right',
          autoClose: 2000,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate('/posts');
        
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

  const handleFileChange = async(e) => {
    console.log(e.target.files);

    const fileInput = new FormData();
    fileInput.append('image', e.target.files[0]);

    const type = e.target.files[0].type;

    if(type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png'){
      setExtensionError(null);

      try {

        //Api request
        const response = await axios.post('/file/upload', fileInput);
        const data = response.data;
        console.log(data)

        toast.success(data.message,{
          position: 'top-right',
          autoClose: 2000,
        });
        
        
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setFormError(initialFormError);
        error.message;
      }

    }else{
      setExtensionError('Only allowed for valid image types');
    }
  };


  console.log(formData);

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <div className="form-container">
        <form className="inner-container" onSubmit={ handleSubmit }>
          <h2 className="form-title">New Post</h2>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="React Blog Project"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="desc"
              placeholder="This is the description"
              type="text"
              className="form-control"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an Image</label>
            <input
              type="file"
              name="file"
              className="form-control"
              placeholder="Selected Image"
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>

          <div className="form-group">
            <label>Select a Category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
                ))}
             
            </select>
            {formError.category && <p className="error">{formError.category}</p>}
          </div>

          <div className="form-group">
            <input type="submit" className="button" value={ `${loading ? 'Adding...': 'Add'}` } />
          </div>
        </form>
      </div>
    </div>
  );
}
