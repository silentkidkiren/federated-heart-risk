// File: src/pages/hospital/TrainModel.jsx

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
} from '@mui/icons-material';
import { mockApi } from '../../services/mockApi';
import MetricsLineChart from '../../components/charts/MetricsLineChart';
import LogsConsole from '../../components/common/LogsConsole';

export default function TrainModel() {
  const [training, setTraining] = useState(false);
  const [trainingId, setTrainingId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleStartTraining = async () => {
    try {
      const result = await mockApi.startTraining('h1');
      setTrainingId(result.trainingId);
      setTraining(true);
      setProgress(0);
      setLogs([]);
      setMetrics([]);
      
      // Simulate training progress
      simulateTraining(result.trainingId);
    } catch (error) {
      console.error('Error starting training:', error);
    }
  };

  const simulateTraining = async (id) => {
    // Simulate logs
    const logMessages = [
      'Initializing training session...',
      'Loading local dataset: 3421 samples',
      'Model architecture verified',
      'Starting epoch 1/5...',
      'Epoch 1/5 - Accuracy: 0.7623 - Loss: 0.3245',
      'Starting epoch 2/5...',
      'Epoch 2/5 - Accuracy: 0.8012 - Loss: 0.2876',
      'Starting epoch 3/5...',
      'Epoch 3/5 - Accuracy: 0.8345 - Loss: 0.2543',
      'Starting epoch 4/5...',
      'Epoch 4/5 - Accuracy: 0.8567 - Loss: 0.2312',
      'Starting epoch 5/5...',
      'Epoch 5/5 - Accuracy: 0.8756 - Loss: 0.2145',
      'Training completed successfully',
      'Uploading model weights to federated server...',
      'Model uploaded successfully',
    ];

    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLogs(prev => [...prev, {
        id: i,
        timestamp: new Date().toISOString(),
        severity: 'info',
        message: logMessages[i],
        source: 'Training',
      }]);
      setProgress(((i + 1) / logMessages.length) * 100);

      // Update metrics after each epoch
      if (logMessages[i].includes('Epoch')) {
        const epoch = parseInt(logMessages[i].split('/')[0].split(' ')[1]);
        if (!isNaN(epoch)) {
          setMetrics(prev => [...prev, {
            epoch,
            accuracy: 0.75 + (epoch * 0.025) + (Math.random() * 0.01),
            loss: 0.35 - (epoch * 0.025) - (Math.random() * 0.01),
          }]);
        }
      }
    }

    setTraining(false);
  };

  const handleStopTraining = () => {
    setTraining(false);
    setLogs(prev => [...prev, {
      id: logs.length,
      timestamp: new Date().toISOString(),
      severity: 'warning',
      message: 'Training stopped by user',
      source: 'Training',
    }]);
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Train Local Model
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Train the cardiovascular disease prediction model on local data
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Training Control
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start federated training on your local dataset
                  </Typography>
                </Box>
                {!training ? (
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleStartTraining}
                    size="large"
                  >
                    Start Training
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={handleStopTraining}
                    size="large"
                  >
                    Stop Training
                  </Button>
                )}
              </Box>

              {training && (
                <Box mt={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Training Progress
                    </Typography>
                    <Chip
                      label="Training in Progress"
                      color="warning"
                      size="small"
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {progress.toFixed(0)}% Complete
                  </Typography>
                </Box>
              )}

              {!training && logs.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No training session active. Click "Start Training" to begin training on your local dataset.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {logs.length > 0 && (
          <>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Accuracy Progress
                  </Typography>
                  {metrics.length > 0 ? (
                    <MetricsLineChart
                      data={metrics}
                      dataKey="accuracy"
                      color="#2E7D32"
                      yAxisFormat={(value) => `${(value * 100).toFixed(1)}%`}
                      xAxisKey="epoch"
                    />
                  ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
                      <Typography variant="body2" color="text.secondary">
                        Waiting for training data...
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Loss Progress
                  </Typography>
                  {metrics.length > 0 ? (
                    <MetricsLineChart
                      data={metrics}
                      dataKey="loss"
                      color="#D32F2F"
                      yAxisFormat={(value) => value.toFixed(3)}
                      xAxisKey="epoch"
                    />
                  ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
                      <Typography variant="body2" color="text.secondary">
                        Waiting for training data...
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Training Logs
                  </Typography>
                  <LogsConsole logs={logs} maxHeight="300px" />
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}