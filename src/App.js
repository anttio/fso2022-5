import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  // Initialize blog list
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Check if user is logged in
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm togglableRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
