import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";

export default function categoryList() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //to get pages(pagination)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        //api request
        const response = await axios.get("/category");
        const data = response.data.data;
        setCategories(data.categories);
        setTotalPage(data.pages);
        console.log(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    };
    getCategories();
  }, []);

  //for the pagination
  useEffect(() => {
    if (totalPage >= 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  console.log(pageCount);

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
      {loading ? (
        "Loading..."
      ) : (
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
            {categories.map((category) => (
              <tr key={categories._id}>
                <td>{category.title}</td>
                <td>{category.desc}</td>
                <td>
                  {moment(category.ceatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>
                  {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
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
            ))}
          </tbody>
        </table>
      )}

      <div className="pag-container">
        <button className="pag-button">prev</button>
        <button className="pag-button">1</button>
        <button className="pag-button">2</button>
        <button className="pag-button">3</button>
        <button className="pag-button">next</button>
      </div>
    </div>
  );
}
