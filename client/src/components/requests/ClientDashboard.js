import React from 'react'
import { Navbar } from '../ui/Navbar'
import { RequestScreen } from './RequestScreen'


export const ClientDashboard = () => {
    return (
        <>
        <Navbar />
            <div className="m-4">
                <h1>Dashboard Cliente</h1>
            </div>
            <RequestScreen />
        </>
    )
}
