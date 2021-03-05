import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'

import { LOGIN_ROUTE, MAIN_ROUTE } from 'coherent/globals'
import { useSelector } from 'coherent/store'
import { getAuthenticated } from 'coherent/store/slices/self'

export const AuthenticatedRoute: React.FC<RouteProps> = props => {
  const { children, ...rest } = props
  const authenticated = useSelector(getAuthenticated)

  return <Route {...rest} render={() => {
    if (authenticated) return children
    return <Redirect to={LOGIN_ROUTE} />
  }} />
}

export const UnauthenticatedRoute: React.FC<RouteProps> = props => {
  const { children, ...rest } = props
  const authenticated = useSelector(getAuthenticated)

  return <Route {...rest} render={() => {
    if (!authenticated) return children
    return <Redirect to={MAIN_ROUTE} />
  }} />
}
