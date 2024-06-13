import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Layout from "../components/Layout";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7083/api/users/login",
        { username, password }
      );
      const data = response.data;
      if (data.flag) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("password", password);
        navigate("/");
      } else {
        setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const validateInput = (input, setInput, setError, errorMessage) => {
    setInput(input);
    if (!input.trim()) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleKeyDown = (event) => {
    setIsCapsLockOn(event.getModifierState("CapsLock"));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& > form": {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            "& > form > *": {
              width: "100%",
              maxWidth: "400px",
            },
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: "#D6001C", fontWeight: "bold", mt: 3 }}
          >
            Login to your account
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Access your asset management system securely and efficiently.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) =>
                validateInput(
                  e.target.value,
                  setUsername,
                  setUsernameError,
                  "Username must not be empty."
                )
              }
              error={!!usernameError}
              helperText={usernameError}
              sx={{
                mt: 2,
                width: "100%",
                "& label.Mui-focused": { color: "#D6001C" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#D6001C" },
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                validateInput(
                  e.target.value,
                  setPassword,
                  setPasswordError,
                  "Password must not be empty."
                )
              }
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={handleKeyDown}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                width: "100%",
                "& label.Mui-focused": { color: "#D6001C" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#D6001C" },
                },
              }}
            />
            {isCapsLockOn && (
              <Typography variant="caption" color="error">
                *Caps Lock is on.
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                bgcolor: "#D6001C",
                "&:hover": {
                  bgcolor: "rgba(214, 0, 28, 0.8)",
                },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Paper>

      <Dialog open={alertOpen} onClose={handleAlertClose}>
        <DialogTitle
          sx={{ bgcolor: "grey.300", color: "#D6001C", fontWeight: "bold" }}
        >
          Error
        </DialogTitle>
        <DialogContent>
          <Typography>
            Invalid username or password. Please try again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} sx={{ color: "#D6001C" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginPage;
