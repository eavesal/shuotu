import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuthenticated } from '../../../context/auth'

interface AuthRoute extends RouteProps {
  children: React.ReactNode
}

export default function AuthRoute({ children, ...rest }: AuthRoute) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const auth = isAuthenticated()
        if (!auth) {
          return (
            <Redirect
              to={{
                pathname: '/login/otp',
                state: { from: location },
              }}
            />
          )
        }
        return children
      }}
    />
  )
}
