import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from '../../utils/axiosInstance';

export default function categoryList() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        //api request
        const response = await axios.get("/category");
        const data = response.data;
        console.log(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response.data;
        toast.error(data.message,{
          position:toast.POSITION.TOP_RIGHT,
          autoClose : 2000
        });
        
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <button
        className="button button-block"
        onClick={() => {
          navigate("new-category");
        }}
      >
        Add New Category
      </button>
      <h2 className="table-title">Category List</h2>
      <input
        type="text"
        name="search"
        placeholder="Search Here"
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>category 1</td>
            <td>description 1</td>
            <td>24/5/2000</td>
            <td>24/5/2024</td>
            <td>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </td>
          </tr>
          <tr>
            <td>category 2</td>
            <td>description 2</td>
            <td>24/5/2000</td>
            <td>24/5/2024</td>
            <td>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </td>
          </tr>
          <tr>
            <td>category 3</td>
            <td>description 3</td>
            <td>24/5/2000</td>
            <td>24/5/2024</td>
            <td>
              <button
                className="button"
                onClick={() => navigate("update-category")}
              >
                Update
              </button>
              <button className="button">Delete</button>
            </td>
          </tr>
          <tr>
            <td>category 4</td>
            <td>description 4</td>
            <td>24/5/2000</td>
            <td>24/5/2024</td>
            <td>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
