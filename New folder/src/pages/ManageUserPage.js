// pages/ManageUserPage.js
import React from 'react';
import Layout from '../components/Layout';
import { Typography } from '@mui/material';

const ManageUserPage = () => {
    return (
        <Layout title="-> Manage User">
            <Typography variant="h5" component="h2" style={{ color: '#D6001C', fontWeight: 'bold' }}>
                Manage User
            </Typography>
            <p>This is the Manage User page.</p>
        </Layout>
    );
};

export default ManageUserPage;
