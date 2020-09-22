import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ClientDashboard } from '../components/requests/ClientDashboard'
import { ExecutiveDashboard } from '../components/requests/ExecutiveDashboard'

export const DashboardRouter = () => {
    return (
        <>
            <div>
                <Switch>
                    <Route 
                        exact path="/client-dashboard"
                        component={ClientDashboard}
                    />
                    <Route 
                        exact path="/executive-dashboard"
                        component={ExecutiveDashboard}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>   
        </>
    )
}