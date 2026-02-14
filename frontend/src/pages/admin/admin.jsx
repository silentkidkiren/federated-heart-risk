// File: src/pages/admin/Overview.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Groups as GroupsIcon,
  Layers as LayersIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { mockApi } from '../../services/mockApi';
import MetricsLineChart from '../../components/charts/MetricsLineChart';

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [metricsHistory, setMetricsHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statusData, historyData] = await Promise.all([
        mockApi.getGlobalModelStatus(),
        mockApi.getGlobalMetricsHistory(),
      ]);
      setStatus(statusData);
      setMetricsHistory(historyData);
    } catch (error) {
      console.error('Error loading data:', error);
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

  const statCards = [
    {
      title: 'Global Model Version',
      value: status.version,
      icon: <LayersIcon sx={{ fontSize: 40 }} />,
      color: 'primary',
      subtitle: 'Latest deployment',
    },
    {
      title: 'Total Federated Rounds',
      value: status.totalRounds,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'secondary',
      subtitle: 'Completed successfully',
    },
    {
      title: 'Connected Hospitals',
      value: status.connectedHospitals,
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      color: 'success',
      subtitle: 'Active participants',
    },
    {
      title: 'Global Accuracy',
      value: `${(status.accuracy * 100).toFixed(2)}%`,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: 'info',
      subtitle: `Loss: ${status.loss.toFixed(4)}`,
    },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          System Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Real-time monitoring of the federated learning network
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
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box
                    sx={{
                      bgcolor: `${card.color}.lighter`,
                      color: `${card.color}.main`,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Chip
                    label="Live"
                    size="small"
                    color="success"
                    sx={{ height: 22, fontSize: '0.7rem' }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Global Accuracy Trend
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Model accuracy across federated rounds
              </Typography>
              <MetricsLineChart
                data={metricsHistory}
                dataKey="accuracy"
                color="#0A4D68"
                yAxisFormat={(value) => `${(value * 100).toFixed(1)}%`}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Global Loss Trend
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Model loss reduction over time
              </Typography>
              <MetricsLineChart
                data={metricsHistory}
                dataKey="loss"
                color="#D32F2F"
                yAxisFormat={(value) => value.toFixed(3)}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                System Health Status
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'success.lighter',
                      border: '1px solid',
                      borderColor: 'success.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Server Status
                    </Typography>
                    <Typography variant="h6" color="success.dark" sx={{ fontWeight: 600 }}>
                      Operational
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'success.lighter',
                      border: '1px solid',
                      borderColor: 'success.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Database
                    </Typography>
                    <Typography variant="h6" color="success.dark" sx={{ fontWeight: 600 }}>
                      Connected
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'success.lighter',
                      border: '1px solid',
                      borderColor: 'success.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Network
                    </Typography>
                    <Typography variant="h6" color="success.dark" sx={{ fontWeight: 600 }}>
                      Stable
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'warning.lighter',
                      border: '1px solid',
                      borderColor: 'warning.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Load
                    </Typography>
                    <Typography variant="h6" color="warning.dark" sx={{ fontWeight: 600 }}>
                      Moderate
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