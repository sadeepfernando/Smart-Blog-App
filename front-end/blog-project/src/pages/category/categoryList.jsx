import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

export default function categoryList() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //to get pages(pagination)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        //api request
        const response = await axios.get(
          `/category?page=${currentPage}&q=${searchValue}`
        );
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
  }, [currentPage]);

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

  //to handle previous button
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  //to handle next button
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  //to handle 1,2,3 page buttons
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input);

       const response = await axios.get(
          `/category?page=${currentPage}&q=${searchValue}`
        );
        const data = response.data.data;
        setCategories(data.categories);
        setTotalPage(data.pages);
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/category/${deleteId}`);

      setShowModel(false);
      const data = response.data;

      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
      });

      const response2 = await axios.get(
        `/category?page=${currentPage}&q=${searchValue}`
      );
      const data2 = response2.data.data;
      setCategories(data2.categories);
      setTotalPage(data2.pages);

    } catch (error) {
      setShowModel(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

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
        onChange={handleSearch}
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
                    onClick={() => navigate(`update-category/${category._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      setDeleteId(category._id);
                      setShowModel(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pageCount.length > 0 && (
        <div className="pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>

          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}


      
      <Modal
        show={showModel}
        onHide={() => {
          setDeleteId(null);
          setShowModel(false);
        }}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            Are you sure you want to delete this category?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => {
                setDeleteId(null);
                setShowModel(false);
              }}
            >
              No
            </Button>
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
