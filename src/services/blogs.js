import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (blogObject) => {
  const updateBlogObject = {
    ...blogObject,
    user: blogObject.user.id,
  };

  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(
    `${baseUrl}/${updateBlogObject.id}`,
    updateBlogObject,
    config
  );
  return res.data;
};

// eslint-disable-next-line
export default { setToken, getAll, create, update };
