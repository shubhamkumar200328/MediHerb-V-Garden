import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/signin" />;

  // In a real-world scenario, fetch user role from backend and validate it here
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
