import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const baseStyles = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const successStyles = {
    color: 'green',
  };

  const errorStyles = {
    color: 'red',
  };

  const styles = () => {
    if (type === 'error') {
      return { ...baseStyles, ...errorStyles };
    }
    return { ...baseStyles, ...successStyles };
  };

  return <div style={styles()}>{message}</div>;
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));

      handleNotificationMessage({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        type: 'success',
      });
    } catch (exception) {}
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

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            author:
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url:
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
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
      {blogForm()}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
