import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import User from './components/User';
import UserList from './components/UserList';
import { initializeBlogs } from './reducers/blogReducer';
import {
  getLoggedInUser,
  initializeUsers,
  logoutUser,
} from './reducers/userReducer';

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  // Initialize blog list
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Initialize users
  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  if (user.loggedInUser === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>{user.loggedInUser.name} logged in</p>
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <UserList />
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm togglableRef={blogFormRef} />
              </Togglable>
              <BlogList />
            </>
          }
        />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
