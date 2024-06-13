// components/Layout.js
import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import VerticalNavbar from './VerticalNavbar';
import { AppRouter } from '../routes/AppRouter';

const Layout = () => {
    return (
        <div>
            <CssBaseline />
            <Header />
            <Box display="flex" paddingTop={2} paddingLeft={2}>
                <Box>
                    <VerticalNavbar />
                </Box>
                <main>
                    <AppRouter />
                </main>
            </Box>
            <Footer />
        </div>
    );
};

export default Layout;
