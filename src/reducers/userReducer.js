import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import blogService from '../services/blogs';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    users: [],
  },
  reducers: {
    initializeUsersReducer(state, action) {
      return { ...state, users: state.users.concat(action.payload) };
    },
    setUserReducer(state, action) {
      return { ...state, loggedInUser: action.payload };
    },
  },
});

export const { initializeUsersReducer, setUserReducer } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(initializeUsersReducer(users));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await userService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch(setUserReducer(user));
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          severity: 'error',
        })
      );
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser');
      dispatch(setUserReducer(null));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const getLoggedInUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON);
        dispatch(setUserReducer(loggedUser));
        blogService.setToken(loggedUser.token);
      }
    } catch (exception) {
      console.log(exception);
    }
  };
};

export default userSlice.reducer;
