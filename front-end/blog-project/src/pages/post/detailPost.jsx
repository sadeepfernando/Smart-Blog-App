import React from 'react'
import Image from '../../assets/image/place.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect , useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

export default function detailPost() {

  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if(postId){
      const getPost =  async() => {

        try {
          //api request
          const response = await axios.get(`/post/${postId}`);
          const data = response.data.data;

          console.log(data);

          setPost(data.post);
 
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      };
      getPost();
    }

  },[postId]);

  console.log(post);


  return (
    <div>
      <button className='button button-block' onClick={()=> navigate(-1)}>Go Back</button>
      <button className='button button-block' onClick={()=> navigate('/posts/update-post')}>Update Post</button>

      <div className="detail-container">
        <h2 className='post-title'>React Blog Project</h2>
        <h5 className="post-category">Category : Category 1</h5>
        <h5 className="post-category">Created At : 10/12/23</h5>
        <h5 className="post-category">Updated At : 10/12/24</h5>
        <p className="post-description">
          This is the description of react blog project
        </p>
        <img src={Image} alt="" />
      </div>
    </div>
  )
}
