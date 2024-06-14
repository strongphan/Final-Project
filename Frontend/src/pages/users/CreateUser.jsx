import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAuthContext } from "../../context/AuthContext";
import { removeExtraWhitespace } from "../../utils/TrimValue";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";

const CreateUser = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: 1,
    joinedDate: null,
    type: 0,
    location: localStorage.getItem("location"),
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

  const [touched, setTouched] = useState({
    dateOfBirth: false,
    joinedDate: false,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUsers({ ...users, [name]: value });
    const isValid = /^[a-zA-Z]{2,20}$/.test(value);

    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (value.length < 2) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters long.`;
    } else if (value.length > 20) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed 20 characters.`;
    } else if (!isValid) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} does not contain space`;
    }
    value = removeExtraWhitespace(value);

    setFormErrors({ ...formErrors, [name]: errorMessage });
  };

  const handleLastNameChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.replace(/\s+/g, " ");
    setUsers({ ...users, [name]: trimmedValue });
    const isValid = /^[a-zA-Z\s]{2,20}$/.test(trimmedValue);

    let errorMessage = "";
    if (trimmedValue.trim() === "") {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (trimmedValue.length < 2) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters long.`;
    } else if (trimmedValue.length > 20) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed 20 characters.`;
    }

    setFormErrors({ ...formErrors, [name]: errorMessage });
  };

  const handleTypeChange = (event) => {
    const { name, value } = event.target;
    if (value === 0) {
      setUsers({ ...users, [name]: value, location: localStorage.getItem("location") });
    } else {
      setUsers({ ...users, [name]: value });
    }
  };

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setUsers({ ...users, [name]: date });
    setTouched({ ...touched, [name]: true });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  const isWeekend = (date) => {
    const day = date?.getDay();
    return day === 6 || day === 0;
  };

  function isValidDate(dateString) {
    if(dateString==='') return false;
    // Check if the format is correct
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
  
    if (month < 1 || month > 12 || year < 1000 || year > 9999) {
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    return day > 0 && day <= daysInMonth;
  }
  

  useEffect(() => {
    let errorMessage = "";
    if (touched.joinedDate) {
      if(!isValidDate(users.dateOfBirth)){
        errorMessage = "Joined date is required.";
      } else {
        const joined = new Date(users.joinedDate);
        const dob = new Date(users.dateOfBirth);

        if (dob && joined < dob) {
          errorMessage = "Joined date must be after date of birth.";
        } else if (isWeekend(joined)) {
          errorMessage = "Joined date must not be on a weekend.";
        }
      }
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, joinedDate: errorMessage }));
  }, [users.joinedDate, users.dateOfBirth, touched.joinedDate]);

  useEffect(() => {
    let errorMessage = "";
    if (touched.dateOfBirth) {
      // if (!users.dateOfBirth) {
      if(!isValidDate(users.dateOfBirth)){
        errorMessage = "Date of birth is required.";
      } else {
        const dob = new Date(users.dateOfBirth);
        const age = Math.floor((Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000));

        if (age < 18) {
          errorMessage = "User is under 18. Please select a different date";
        }
      }
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: errorMessage }));
  }, [users.dateOfBirth, touched.dateOfBirth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(formErrors).some((error) => error);
    if (!hasErrors) {
      try {
        if (!users.location) {
          users.location = currentUser.locality;
        }
        if (users.location) {
          users.location === "HaNoi"
            ? (users.location = 1)
            : (users.location = 0);
        }
        if (users.gender) {
          users.gender = +users.gender;
        }
        const response = await axios.post("https://localhost:7083/api/users", {
          ...users,
          dateOfBirth: users.dateOfBirth ? formatDate(users.dateOfBirth) : null,
          joinedDate: users.joinedDate ? formatDate(users.joinedDate) : null,
        });
        console.log("Response:", response.data);
        console.log("User created successfully.");
        navigate("/manage-user");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Form has errors. Please fill all required fields.");
    }
  };

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <Box sx={{ width: "60%", borderRadius: 1, p: 1 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "#d32f2f",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Create New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  First Name
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={{
                    "& label.Mui-focused": { color: "#000" },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#000" },
                    },
                  }}
                  placeholder="First Name"
                  onBlur={handleChange}
                  fullWidth
                  name="firstName"
                  value={users.firstName}
                  onChange={handleChange}
                  margin="dense"
                  error={formErrors.firstName}
                />
                {formErrors.firstName && (
                  <FormHelperText error>{formErrors.firstName}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Last Name
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={{
                    "& label.Mui-focused": { color: "#000" },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#000" },
                    },
                  }}
                  placeholder="Last Name"
                  onBlur={handleLastNameChange}
                  fullWidth
                  name="lastName"
                  value={users.lastName}
                  onChange={handleLastNameChange}
                  margin="dense"
                  error={formErrors.lastName}
                />
                {formErrors.lastName && (
                  <FormHelperText error>{formErrors.lastName}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Date of Birth
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                  <DatePicker
              sx={{
                "& label.Mui-focused": { color: "#000" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
                  onBlur={handleChange}
                    value={users.dateOfBirth}
                    inputFormat="dd/MM/yyyy"
                    onChange={(date) => handleDateChange("dateOfBirth", date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="dense"
                        error={Boolean(formErrors.dateOfBirth)}
                        onBlur={() => setTouched({ ...touched, dateOfBirth: true })}
                      />
                    )}
                  />
                </LocalizationProvider>
                {formErrors.dateOfBirth && (
                  <FormHelperText error>{formErrors.dateOfBirth}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Gender
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
<Grid item xs={9}>
  <FormControl component="fieldset">
    <RadioGroup
      row
      aria-label="gender"
      name="gender"
      value={users.gender}
      onChange={handleGenderChange}
    >
      <FormControlLabel
        value="0"
        control={
          <Radio
            sx={{
              color: "#000", 
              "&.Mui-checked": {
                color: "#d32f2f", 
              },
            }}
          />
        }
        label="Female"
      />
       <FormControlLabel
        value="1"
        control={
          <Radio
            sx={{
              color: "#000", 
              "&.Mui-checked": {
                color: "#d32f2f", 
              },
            }}
          />
        }
        label="Male"
      />
    </RadioGroup>
  </FormControl>
</Grid>


              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Joined Date
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                  <DatePicker
              sx={{
                "& label.Mui-focused": { color: "#000" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
                    value={users.joinedDate}
                    inputFormat="dd/MM/yyyy"
                    onChange={(date) => handleDateChange("joinedDate", date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="dense"
                        error={Boolean(formErrors.joinedDate)}
                        onBlur={() => setTouched({ ...touched, joinedDate: true })}
                      />
                    )}
                  />
                </LocalizationProvider>
                {formErrors.joinedDate && (
                  <FormHelperText error>{formErrors.joinedDate}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Type
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                    }}
                    labelId="type-label"
                    name="type"
                    value={users.type}
                    onChange={handleTypeChange}
                    label="Type"
                  >
                    <MenuItem value={0}>Admin</MenuItem>
                    <MenuItem value={1}>Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Location
                  <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                    }}
                    labelId="location-label"
                    name="location"
                    value={users.location}
                    onChange={handleLocationChange}
                    label="Location"
                  >
                    <MenuItem value={0}>Hồ Chí Minh</MenuItem>
                    <MenuItem value={1}>Hà Nội</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginRight: 1 }}
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
    </>
  );
};

export default CreateUser;
