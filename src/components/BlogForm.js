import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
