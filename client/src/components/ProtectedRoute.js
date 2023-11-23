import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';


const ProtectedRoute = ({ children }) => {

  const { account } = useContext(AccountContext)
  
  if (localStorage.getItem('loginTokken') === null && Object.keys(account).length === 0) {
    
    return <Navigate to='/'/>;
  }
  

  return children;
};

export default ProtectedRoute;