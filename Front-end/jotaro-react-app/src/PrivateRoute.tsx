import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  user: any;
  children: ReactElement; // ✅ use ReactElement instead of JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
