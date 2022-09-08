import { useState } from 'react';
import Notification from './Notification';

const LoginForm = ({ login, notificationMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <div>
      <h2>log in to application</h2>
      {notificationMessage && (
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="login-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="login-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
