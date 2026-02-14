// File: src/pages/hospital/LocalMetrics.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { mockApi } from '../../services/mockApi';
import MetricsLineChart from '../../components/charts/MetricsLineChart';

export default function LocalMetrics() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await mockApi.getLocalMetrics('h1');
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
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

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Local Training Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Performance metrics from local training sessions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Accuracy Over Rounds
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Local model accuracy improvement across training rounds
              </Typography>
              <MetricsLineChart
                data={metrics}
                dataKey="accuracy"
                color="#2E7D32"
                yAxisFormat={(value) => `${(value * 100).toFixed(1)}%`}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Loss Over Rounds
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Local model loss reduction across training rounds
              </Typography>
              <MetricsLineChart
                data={metrics}
                dataKey="loss"
                color="#D32F2F"
                yAxisFormat={(value) => value.toFixed(3)}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Model Performance Summary
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
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
                      Best Accuracy
                    </Typography>
                    <Typography variant="h5" color="success.dark" sx={{ fontWeight: 700 }}>
                      {(Math.max(...metrics.map(m => m.accuracy)) * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'error.lighter',
                      border: '1px solid',
                      borderColor: 'error.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Lowest Loss
                    </Typography>
                    <Typography variant="h5" color="error.dark" sx={{ fontWeight: 700 }}>
                      {Math.min(...metrics.map(m => m.loss)).toFixed(4)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'primary.lighter',
                      border: '1px solid',
                      borderColor: 'primary.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Rounds
                    </Typography>
                    <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 700 }}>
                      {metrics.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'secondary.lighter',
                      border: '1px solid',
                      borderColor: 'secondary.light',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Improvement
                    </Typography>
                    <Typography variant="h5" color="secondary.dark" sx={{ fontWeight: 700 }}>
                      +{((metrics[metrics.length - 1].accuracy - metrics[0].accuracy) * 100).toFixed(2)}%
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