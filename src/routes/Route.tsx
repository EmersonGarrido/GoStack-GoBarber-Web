import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom'
import { useAuth} from '../hooks/auth';

interface RouterProps extends ReactDOMRouteProps{
  isPrivated?: boolean;
  component : React.ComponentType;
}

const Route: React.FC<RouterProps> = ({ isPrivated = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute 
    {...rest } 
    render={({location}) => {
     return isPrivated === !!user ? (
       <Component />
     ) : (
       <Redirect to={{pathname: isPrivated ? '/' : 'dashboard', state: { from: location}}} />
     )
    }}
    />
  )
}

export default Route;