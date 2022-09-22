import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (togglableRef) {
      togglableRef.current.toggleVisibility();
    }
    dispatch(createBlog({ title, author, url }));
    dispatch(setNotification({ message: title, severity: 'success' }));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="blog-title">title:</label>
          <input
            id="blog-title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="blog-author">author:</label>
          <input
            id="blog-author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="blog-url">url:</label>
          <input
            id="blog-url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <button id="blog-submit" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
