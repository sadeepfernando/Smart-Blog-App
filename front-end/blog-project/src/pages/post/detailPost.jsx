import React from 'react'
import Image from '../../assets/image/place.jpeg';
import { useNavigate } from 'react-router-dom';

export default function detailPost() {
  const navigate = useNavigate();
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
