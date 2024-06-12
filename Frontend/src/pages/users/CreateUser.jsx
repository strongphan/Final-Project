import React, { useState } from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Box,
  Grid,
  FormHelperText
} from '@mui/material';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    gender: 'female',
    joinedDate: null,
    type: '',
    location: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    gender: false,
    joinedDate: false,
    type: false, 
    location: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setFormErrors({ ...formErrors, [name]: value.trim() === '' });
  };

  const handleDateChange = (name, date) => {
    setUser({ ...user, [name]: date });
    setFormErrors({ ...formErrors, [name]: !date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(formErrors).some((error) => error);
    if (!hasErrors) {
      try {
        const response = await axios.post('', user);
        console.log('Response:', response.data);
        console.log('User created successfully.');
        navigate('/manage-user');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form has errors. Please fill all required fields.');
    }
  };

  return (
    <Layout title="Manage User > Create New User">
      <Container sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Box sx={{ width: '60%', borderRadius: 1, p: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#d32f2f', fontWeight: 'bold', fontSize: '20px' }}>
            Create New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  First Name
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  margin="dense"
                  required
                  error={formErrors.firstName}
                />
              {formErrors.firstName && <FormHelperText error>First name is required!</FormHelperText>}
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Last Name
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  margin="dense"
                  required
                  error={formErrors.firstName}
                />
              {formErrors.lastName && <FormHelperText error>Last name is required!</FormHelperText>}
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Date of Birth
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                  margin="dense"
                  required
                  error={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Gender
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <RadioGroup
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio sx={{ color: '#d32f2f', '&.Mui-checked': { color: '#d32f2f' } }} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio sx={{ color: '#d32f2f', '&.Mui-checked': { color: '#d32f2f' } }} />}
                    label="Male"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Joined Date
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="joinedDate"
                  value={user.joinedDate}
                  onChange={handleChange}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Type
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    name="type"
                    value={user.type}
                    onChange={handleChange}
                    label="Type" 
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* location  */}
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center',display: user.type === 'admin' ? 'block' : 'none' }}>
                <Typography>
                  Location
                  <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={7} sx={{ display: user.type === 'admin' ? 'block' : 'none' }}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="type-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    label="Location" 
                  >
                    <MenuItem value="hanoi">Ha Noi</MenuItem>
                    <MenuItem value="hochiminh">Ho Chi Minh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ backgroundColor: '#d32f2f', mr: 3 }}
                    disabled={Object.values(formErrors).some((error) => error)}
                  >
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => navigate("/manage-user")}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default CreateUser;
