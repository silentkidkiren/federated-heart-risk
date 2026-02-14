import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Sync as SyncIcon,
  LocalHospital as HospitalIcon,
  Assignment as LogsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const menuItems = [
  { text: 'Overview', path: '/admin', icon: <DashboardIcon /> },
  { text: 'Federated Rounds', path: '/admin/federated-rounds', icon: <SyncIcon /> },
  { text: 'Hospitals', path: '/admin/hospitals', icon: <HospitalIcon /> },
  { text: 'System Logs', path: '/admin/system-logs', icon: <LogsIcon /> }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Federated CVD Risk Prediction
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            Admin
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            variant="outlined"
            size="small"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white'
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}