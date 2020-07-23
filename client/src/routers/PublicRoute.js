import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    isClient,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={ (props) => (
                ( !isAuthenticated ) 
                    ? (<Component {...props} />)
                    : (
                    (isClient)
                    ? <Redirect to="client-dashboard" />
                    : <Redirect to="executive-dashboard" />
                    )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isClient: PropTypes.bool,
    component: PropTypes.func.isRequired
}