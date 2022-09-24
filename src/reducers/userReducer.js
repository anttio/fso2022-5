import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    getUserReducer(state) {
      return state;
    },
    setUserReducer(state, action) {
      return action.payload;
    },
  },
});

export const { getUserRedcuer, setUserReducer } = userSlice.actions;

export const getUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON);
        dispatch(setUserReducer(loggedUser));
      }
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
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

export default userSlice.reducer;
