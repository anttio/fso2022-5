import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { clearNotification } from '../reducers/notificationReducer';

let timeoutId;

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => dispatch(clearNotification()), 5000);

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
    if (notification.severity === 'error') {
      return { ...baseStyles, ...errorStyles };
    }
    return { ...baseStyles, ...successStyles };
  };

  return (
    notification && (
      <div className="notification" style={styles()}>
        {notification.message}
      </div>
    )
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
