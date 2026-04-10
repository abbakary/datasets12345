import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Settings,
  LogOut,
  TrendingUp,
  BookOpen,
  Heart,
  MessageSquare,
  HelpCircle,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import logo from "../../assets/dali-data-logo.png";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

export default function UserProfile() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [settingsMenu, setSettingsMenu] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [editPhoneOpen, setEditPhoneOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    loadAuthUser();
  }, []);

  const loadAuthUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setAuthUser(userData);
        setPhoneInput(userData.phone || "");
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  };

  const handleSettingsClick = (event) => {
    setSettingsMenu(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsMenu(null);
  };

  const handleEditPhoneOpen = () => {
    setEditPhoneOpen(true);
    handleSettingsClose();
  };

  const handleEditPhoneClose = () => {
    setEditPhoneOpen(false);
  };

  const handleSavePhone = () => {
    if (authUser) {
      const updatedUser = { ...authUser, phone: phoneInput };
      setAuthUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      handleEditPhoneClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("auth:updated"));
    navigate("/login");
  };

  const menuItems = [
    { label: "Make Money", icon: TrendingUp, id: "make-money" },
    { label: "My Datasets", icon: BookOpen, id: "my-datasets" },
    { label: "Saved Collections", icon: Heart, id: "saved-collections" },
    { label: "Feedback", icon: MessageSquare, id: "feedback" },
    { label: "Help & FAQ", icon: HelpCircle, id: "faq" },
  ];

  const getInitials = () => {
    if (!authUser?.name) return "U";
    return authUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const ProfileSidebar = () => (
    <Box
      sx={{
        width: 280,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {/* Settings Icon */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          onClick={handleSettingsClick}
          sx={{
            color: "#666",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
          }}
        >
          <Settings size={20} />
        </IconButton>
      </Box>

      {/* Avatar Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, pt: 2 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: PRIMARY_COLOR,
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "white",
            border: `4px solid ${PRIMARY_COLOR}`,
          }}
        >
          {getInitials()}
        </Avatar>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: "#1a1a1a",
            fontSize: "1.1rem",
          }}
        >
          {authUser?.name || "User"}
        </Typography>

        {authUser?.phone ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {authUser.phone}
            </Typography>
            <Button
              size="small"
              onClick={handleEditPhoneOpen}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                color: PRIMARY_COLOR,
                fontWeight: 500,
                p: 0,
                "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
              }}
            >
              Edit
            </Button>
          </Box>
        ) : (
          <Button
            size="small"
            onClick={handleEditPhoneOpen}
            sx={{
              textTransform: "none",
              fontSize: "0.8rem",
              color: PRIMARY_COLOR,
              fontWeight: 600,
              p: 0.5,
              "&:hover": { backgroundColor: "rgba(97, 197, 195, 0.1)" },
            }}
          >
            + ADD PHONE NUMBER
          </Button>
        )}
      </Box>

      <Divider sx={{ backgroundColor: "rgba(0,0,0,0.1)" }} />

      {/* Menu Items */}
      <List sx={{ p: 0, gap: 1, display: "flex", flexDirection: "column" }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => {
              // Handle navigation based on id
              setMobileDrawerOpen(false);
            }}
            sx={{
              p: 1.5,
              borderRadius: 1,
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#f9f9f9",
                borderColor: PRIMARY_COLOR,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: PRIMARY_COLOR,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <item.icon size={20} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#1a1a1a",
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Divider */}
      <Divider sx={{ backgroundColor: "rgba(0,0,0,0.1)" }} />

      {/* Logout Button */}
      <Button
        fullWidth
        onClick={handleLogout}
        startIcon={<LogOut size={18} />}
        sx={{
          backgroundColor: "#f0f0f0",
          color: "#333",
          textTransform: "none",
          fontWeight: 600,
          py: 1.2,
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          "&:hover": {
            backgroundColor: "#e8e8e8",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  const MainContent = () => (
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, md: 4 },
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#1a1a1a",
          mb: 1,
        }}
      >
        Welcome, {authUser?.name || "User"}!
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          mb: 3,
        }}
      >
        Manage your profile and explore your options
      </Typography>

      {/* Quick Stats Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 4 }}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
            Account Status
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: PRIMARY_COLOR,
              textTransform: "capitalize",
            }}
          >
            {authUser?.status || "Active"}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
            Your Role
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: PRIMARY_COLOR,
              textTransform: "capitalize",
            }}
          >
            {authUser?.role || "Viewer"}
          </Typography>
        </Box>
      </Box>

      {/* Main Info Box */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f0fffe",
          borderRadius: 2,
          border: `1px solid ${PRIMARY_COLOR}20`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
          Profile Information
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.8 }}>
          <strong>Email:</strong> {authUser?.email || "N/A"}
          <br />
          <strong>Phone:</strong> {authUser?.phone || "Not added yet"}
          <br />
          <strong>Member Since:</strong> {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: PRIMARY_COLOR,
          color: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/public/datasets")}
          >
            <img src={logo} alt="Dali Data" style={{ height: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                display: { xs: "none", sm: "block" },
              }}
            >
              Profile
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setMobileDrawerOpen(true)}
          >
            <MenuIcon size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Desktop Sidebar */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ProfileSidebar />
        </Box>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1200,
              display: { xs: "flex", md: "none" },
            }}
            onClick={() => setMobileDrawerOpen(false)}
          >
            <Box
              sx={{
                width: 280,
                backgroundColor: "#f5f5f5",
                overflow: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => setMobileDrawerOpen(false)}>
                  <X size={24} />
                </IconButton>
              </Box>
              <ProfileSidebar />
            </Box>
          </Box>
        )}

        {/* Main Content */}
        <MainContent />
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsMenu}
        open={Boolean(settingsMenu)}
        onClose={handleSettingsClose}
      >
        <MenuItem onClick={handleEditPhoneOpen}>Edit Phone Number</MenuItem>
        <MenuItem onClick={handleSettingsClose}>Account Settings</MenuItem>
      </Menu>

      {/* Edit Phone Dialog */}
      <Dialog open={editPhoneOpen} onClose={handleEditPhoneClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: "#1a1a1a" }}>Edit Phone Number</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPhoneClose} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSavePhone}
            variant="contained"
            sx={{
              backgroundColor: PRIMARY_COLOR,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Save Phone
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
