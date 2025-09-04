import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function CheckAuth({ isAuthenticated, user, children }) {

  const location = useLocation()

  // User is not authenticated
  if (!isAuthenticated && !(location.pathname.includes('/signin') || location.pathname.includes('/signup'))) {
    return <Navigate to='/auth/signup' />
  }

  // User is authenticate
  if (
    isAuthenticated &&
    (location.pathname.includes('/signin') || location.pathname.includes('/signup'))
  ) {
    if (user?.role === 'admin') {
      return <Navigate to='/admin/dashboard' />
    } else {
      return <Navigate to='/shopping/home' />
    }
  }


  // Not admin but access dashboard

  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
    return <Navigate to="/unauthorize" />
  }

  // Authenticated but as a Admin
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shopping')) {
    return <Navigate to='/admin/dashboard' />
  }

  return <>{children}</>

}