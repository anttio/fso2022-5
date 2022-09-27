import { useSelector } from 'react-redux';

const User = () => {
  const user = useSelector(({ user }) => user);

  // TODO: This shows all blogs not just this users. Maybe one day, maybe.
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div>
      <h2>{user.loggedInUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
