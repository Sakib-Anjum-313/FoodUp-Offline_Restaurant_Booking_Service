import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashBoard from './AdminDashBoard';
import AdminHeader from './AdminHeader/AdminHeader';

const AdminPage = () => {
    return (
        <div>
            <AdminHeader></AdminHeader>
            <AdminDashBoard></AdminDashBoard>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminPage;