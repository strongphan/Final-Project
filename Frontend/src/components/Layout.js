import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { AppRouter } from "../routes/AppRouter";
import Footer from "./Footer";
import Header from "./Header";
import VerticalNavbarAdmin from "./VerticalNavbarAdmin";
import VerticalNavbarStaff from "./VerticalNavbarStaff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Layout = ({ children }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [cValidationError, setCValidationError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // State for showing/hiding new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing/hiding confirm password
  const { currentUser, isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && currentUser.isFirst) {
      setShowLogoutDialog(true);
    }
  }, [currentUser.isFirst]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCloseDialog = () => {
    setShowLogoutDialog(false);
  };

  const handlePasswordChange = async () => {
    const oldPassword = localStorage.getItem("password");
    const newPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (newPassword === oldPassword) {
      setValidationError(
        "New password must be different from the old password."
      );
      return;
    }
    if (!newPasswordRegex.test(newPassword)) {
      setValidationError(
        "New password must be 8-16 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = currentUser.id;
        const response1 = await axios.post(
          "https://localhost:7083/api/users/change_password",
          {
            id: userId,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: newPassword,
          }
        );

        if (response1.data === true) {
          const username = currentUser.name;
          const response2 = await axios.post(
            "https://localhost:7083/api/users/login",
            { userName: username, password: newPassword }
          );
          const data = response2.data;
          setIsAuthenticated(true);
          localStorage.setItem("token", data.token);
          currentUser.isFirst = false;

          setNewPassword("");
          setShowLogoutDialog(false);
          localStorage.removeItem("firstLogin");
          setShowSuccessDialog(true);
          localStorage.removeItem("password");
        } else {
          setValidationError("Failed to change password. Please try again.");
        }
      } else {
        setValidationError("User token not found. Please login again.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationError(
        "An error occurred while changing password. Please try again later."
      );
    }
  };

  const handlePasswordBlur = () => {
    setValidationError("");
    const oldPassword = localStorage.getItem("password");
    if (!newPassword) {
      setValidationError("New password cannot be empty.");
    }
  };

  const handleConfirmPassword = () => {
    if (!confirmPassword) {
      setCValidationError("Confirm password cannot be empty.");
    } else if (confirmPassword !== newPassword) {
      setCValidationError("Passwords do not match. Please re-enter.");
    } else {
      setCValidationError("");
    }
  };

  const handleKeyDown = (event) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
    if (
      (newPassword || confirmPassword) &&
      event.getModifierState("CapsLock")
    ) {
      setValidationError(
        "Caps Lock is on. Please check if you're unintentionally using uppercase letters."
      );
    } else {
      setValidationError("");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <CssBaseline />
      <Header />
      <Box display="flex" p={2}>
        <Box>
          {isAuthenticated &&
            (currentUser.role === "Admin" ? (
              <VerticalNavbarAdmin />
            ) : (
              <VerticalNavbarStaff />
            ))}
        </Box>
        <Box flexGrow={1} ml={2}>
          <main style={{ p: "2" }}>
            <AppRouter />
          </main>
        </Box>
      </Box>
      <Footer />

      <Dialog
        open={currentUser.isFirst && showLogoutDialog}
        onClose={handleCloseDialog}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle sx={{ color: "#D6001C" }}>Change Password</DialogTitle>
        <DialogContent>
          <Typography>
            This is the first time you've logged in. You must change your
            password to continue.
          </Typography>
          <Box mt={2}>
            <TextField
              autoFocus
              margin="dense"
              label="New Password"
              type={showNewPassword ? "text" : "password"} // Toggle visibility based on showNewPassword state
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              required
              onKeyDown={handleKeyDown}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleNewPasswordVisibility}>
                      {showNewPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& label.Mui-focused": { color: "#000" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
            />
          </Box>
          {validationError && (
            <Typography color="error" variant="caption" component="div">
              {validationError}
            </Typography>
          )}
          <Box mt={2}>
            <TextField
              margin="dense"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"} // Toggle visibility based on showConfirmPassword state
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& label.Mui-focused": { color: "#000" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
            />
          </Box>
          {cValidationError && (
            <Typography color="error" variant="caption" component="div">
              {cValidationError}
            </Typography>
          )}
          {capsLockOn && (
            <Typography color="error" variant="caption" component="div">
              *Caps Lock is on. Please check if you're unintentionally using
              uppercase letters.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!!validationError || !!cValidationError}
            onClick={handlePasswordChange}
            variant="contained"
            sx={{ bgcolor: "#D6001C", "&:hover": { bgcolor: "#D6001C" } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Password changed successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            sx={{
              color: "white",
              bgcolor: "#D6001C",
              "&:hover": { bgcolor: "#D6001C" },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
