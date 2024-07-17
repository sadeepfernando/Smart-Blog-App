import React from 'react'
import cardImg from '../../assets/image/place.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";


export default function postList() {

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        //api request
        const response = await axios.get(
          `/post?page=${currentPage}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.posts);
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
    getPosts();
  }, [currentPage]);

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
          `/post?page=${currentPage}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.posts);
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


  return (
    <div>
      <button className='button button-block' onClick={()=> navigate('new-post')}>Add New Post</button>
      <h2 className='table-title'>Post List</h2>

      <input type="text" className='search-input' name='search' onChange={handleSearch} placeholder='Search here' />

      <div className='flexbox-container wrap'>

      {loading ? "Loading" : (posts.map((post) => (
        <div className="post-card" key={post._id}onClick={() => navigate('detail-post')}>
          <h4 className='card-title'>{post.title}</h4>
          <p className='card-desc'>{post.desc.substring(0, 50)}</p>
        </div>
        )))}

      </div>

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
    </div>
  )
}
