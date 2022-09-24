import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  );

  const user = useSelector(({ user }) => user);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          allowRemove={blog.user && blog.user.username === user.username}
        />
      ))}
    </div>
  );
};

export default BlogList;
