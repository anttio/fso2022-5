import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({});

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      handleNotificationMessage({
        message: `wrong username or password`,
        type: 'error',
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));

      handleNotificationMessage({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        type: 'success',
      });
    } catch (exception) {}
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    } catch (exception) {
      setNotificationMessage({
        message: exception.response.data.error,
        type: 'error',
      });
    }
  };

  const handleNotificationMessage = ({ message, type }) => {
    if (message === null) {
      return false;
    }
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage('');
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type}
        />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        ))}
      </div>
    </div>
  );
};

export default App;
