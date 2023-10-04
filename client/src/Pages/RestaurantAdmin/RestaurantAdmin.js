import React from 'react';
import { Outlet } from 'react-router-dom';
import ResAdminDashBoard from './ResAdminDashBoard';
import ResAdminHeader from './ResAdminHeader/ResAdminHeader';

const RestaurantAdmin = () => {
    return (
        <div>
            <ResAdminHeader></ResAdminHeader>
            <ResAdminDashBoard></ResAdminDashBoard>
            <Outlet></Outlet>
        </div>
    );
};

export default RestaurantAdmin;