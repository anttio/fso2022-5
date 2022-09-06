import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showBlogDetails = { display: detailsVisible ? '' : 'none' };

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: (blog.likes += 1),
    });
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showBlogDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.author}</div>
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

export default Blog;
