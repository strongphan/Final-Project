// pages/HomePage.js
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const HomePage = () => {
    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                    Welcome to the Asset Management System
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Manage your assets efficiently and effectively with our intuitive and user-friendly interface.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Our system provides a comprehensive solution for tracking and managing your assets. With real-time data and insightful analytics, you can make informed decisions to optimize your asset utilization and performance.
                </Typography>
            </Box>
        </Paper>
    );
};

export default HomePage;
