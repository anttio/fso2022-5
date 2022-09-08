import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

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

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login({
        username: loginObject.username,
        password: loginObject.password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      handleNotificationMessage({
        message: 'wrong username or password',
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
    } catch (exception) {
      // TODO:
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    } catch (exception) {
      handleNotificationMessage({
        message: exception.response.data.error,
        type: 'error',
      });
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      console.log(exception);
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
      <LoginForm
        login={handleLogin}
        notificationMessage={notificationMessage}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notificationMessage && (
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type}
        />
      )}
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            allowRemove={blog.user && blog.user.username === user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
