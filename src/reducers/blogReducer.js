import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    initializeBlogsReducer(state, action) {
      return action.payload;
    },
    createBlogReducer(state, action) {
      const createdBlog = action.payload;
      return state.concat(createdBlog);
    },
    updateBlogReducer(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    removeBlogReducer(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const {
  initializeBlogsReducer,
  createBlogReducer,
  removeBlogReducer,
  updateBlogReducer,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(initializeBlogsReducer(blogs));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);
      dispatch(createBlogReducer(createdBlog));
      dispatch(
        setNotification({
          message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          severity: 'success',
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog);
      dispatch(updateBlogReducer(updatedBlog));
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          severity: 'error',
        })
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlogReducer(id));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export default blogSlice.reducer;
