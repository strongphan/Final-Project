import React, { useState } from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Select, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const ManageUserPage = () => {
    const [users, setUsers] = useState([
        { staffCode: 'SD1901', fullName: 'An Nguyen Thuy', username: 'annt', joinedDate: '20/06/2019', type: 'Staff' },
        { staffCode: 'SD1234', fullName: 'An Tran', username: 'antt', joinedDate: '15/07/2020', type: 'Staff' },
    ]);

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    const handleDelete = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(user => user !== selectedUser));
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateUser = () => {
        navigate('/create-user');
    };

    return (
        <Layout title="> Manage User">
            <Container  sx={{ mt: 4, p: 3 }}>
                <Typography variant="h5" component="h2" style={{ color: '#f0001f', fontWeight: 'bold' }}>
                    User List
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Select defaultValue="" sx={{ width: 150, height: '30px' }}>
                        <MenuItem value="">Type</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                    <TextField 
                        placeholder="Search" 
                        InputProps={{ endAdornment: <Search /> }} 
                        sx={{ height: '25px' }} 
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleCreateUser}
                        sx={{ backgroundColor: '#ff0a2a', '&:hover': { backgroundColor: 'darkred' }, height: '50px' }}
                    >
                        Create new user
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Staff Code</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Joined Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.staffCode}>
                                    <TableCell>{user.staffCode}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.joinedDate}</TableCell>
                                    <TableCell>{user.type}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary"><Edit /></IconButton>
                                        <IconButton color="secondary" onClick={() => handleDelete(user)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to disable this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={confirmDelete} color="secondary">Disable</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default ManageUserPage;
