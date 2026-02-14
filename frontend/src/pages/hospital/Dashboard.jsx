// File: src/pages/hospital/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Sync as SyncIcon,
  CheckCircle as CheckCircleIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { mockApi } from '../../services/mockApi';

export default function HospitalDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await mockApi.getHospitalDashboard('h1');
      setDashboard(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  const statCards = [
    {
      title: 'Local Model Version',
      value: dashboard.modelVersion,
      icon: <StorageIcon sx={{ fontSize: 36 }} />,
      color: 'primary',
      subtitle: 'Current deployment',
    },
    {
      title: 'Last Sync',
      value: formatTimestamp(dashboard.lastSync),
      icon: <SyncIcon sx={{ fontSize: 36 }} />,
      color: 'info',
      subtitle: 'With global server',
    },
    {
      title: 'Training Accuracy',
      value: `${(dashboard.lastTrainingAccuracy * 100).toFixed(2)}%`,
      icon: <CheckCircleIcon sx={{ fontSize: 36 }} />,
      color: 'success',
      subtitle: 'Last training session',
    },
    {
      title: 'Training Loss',
      value: dashboard.lastTrainingLoss.toFixed(4),
      icon: <TrendingDownIcon sx={{ fontSize: 36 }} />,
      color: 'warning',
      subtitle: 'Last training session',
    },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Hospital Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dashboard.hospitalName} - Real-time status and metrics
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    bgcolor: `${card.color}.lighter`,
                    color: `${card.color}.main`,
                    borderRadius: 2,
                    p: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {card.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Model Status
                </Typography>
                <Chip
                  label={dashboard.modelStatus === 'ready' ? 'Ready' : 'Training'}
                  color={dashboard.modelStatus === 'ready' ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Training Sessions Completed
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dashboard.totalTrainingSessions}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(dashboard.totalTrainingSessions / 50) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Total Predictions Made
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dashboard.totalPredictions}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(dashboard.totalPredictions / 2000) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="secondary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'primary.lighter',
                      border: '2px solid',
                      borderColor: 'primary.light',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                      Train
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Start new training
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'secondary.lighter',
                      border: '2px solid',
                      borderColor: 'secondary.light',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'secondary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 600 }}>
                      Predict
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      New prediction
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}