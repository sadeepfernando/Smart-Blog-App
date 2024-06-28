import React from 'react'

export default function newPost() {
  return (
    <div>
      <button className='button button-block'>Go Back</button>

      <div className="form-container">
        <form  className="inner-container">
          <h2 className="form-title">New Post</h2>

          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title"  placeholder="React Blog Project" className='form-control' />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="desc"  placeholder="This is the description" type='text' className='form-control'></textarea> 
          </div>

          <div className="form-group">
            <label>Select an Image</label>
            <input type="file" name="file" className='form-control' placeholder='Selected Image' />
          </div>

          <div className="form-group">
            <label>Select a Category</label>
            <select className='form-control'>
              <option value="category 1">Category 1</option>
              <option value="category 2">Category 2</option>
              <option value="category 3">Category 3</option>
            </select>
          </div>

          <div className="form-group">
            <input type="submit" className='button' value='Add' />
          </div>

        </form>
      </div>
    </div>
  )
}
