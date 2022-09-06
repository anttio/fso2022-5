import PropTypes from 'prop-types';

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
