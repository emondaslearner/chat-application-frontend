import React, { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return <>{children}</>;
}

export default PublicRoute;
