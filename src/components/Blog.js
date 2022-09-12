import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, removeBlog, allowRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [removeButtonVisible] = useState(allowRemove);

  const showBlogDetails = { display: detailsVisible ? '' : 'none' };

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: (blog.likes += 1),
    });
  };

  const handleRemove = () => {
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`;
    if (window.confirm(confirmMessage)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span id="blog-title">{blog.title}</span>
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showBlogDetails} className="blog-details">
        {blog.url && <div className="blog-url">{blog.url}</div>}
        <div>
          {blog.likes && <span className="blog-likes">{blog.likes}</span>}
          <button onClick={handleLike}>like</button>
        </div>
        <div id="blog-author">{blog.author}</div>
        {removeButtonVisible && (
          <div>
            <button onClick={handleRemove}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  allowRemove: PropTypes.bool,
};

export default Blog;
