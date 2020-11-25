import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuthenticated } from '../../../context/auth'

interface NoneAuthRoute extends RouteProps {
  children: React.ReactNode
}

export default function NoneAuthRoute({ children, ...rest }: NoneAuthRoute) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const auth = isAuthenticated()
        if (auth) {
          return (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          )
        }
        return children
      }}
    />
  )
}
