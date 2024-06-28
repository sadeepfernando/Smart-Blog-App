import React from 'react'
import cardImg from '../../assets/image/place.jpeg';

export default function postList() {
  return (
    <div>
      <button className='button button-block'>Add New Post</button>
      <h2 className='table-title'>Post List</h2>

      <input type="text" className='search-input' name='search' placeholder='Search here' />

      <div className='flexbox-container wrap'>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>

        <div className="post-card">
          <h4 className='card-title'>React Blog project</h4>
          <p className='card-desc'>This is the description of react blog project</p>
          <img src={cardImg} alt="mern" className='card-img' />
        </div>










      </div>
    </div>
  )
}
