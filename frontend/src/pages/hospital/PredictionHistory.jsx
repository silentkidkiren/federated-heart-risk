// File: src/pages/hospital/PredictionHistory.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { mockApi } from '../../services/mockApi';
import PredictionHistoryTable from '../../components/tables/PredictionHistoryTable';

export default function PredictionHistory() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await mockApi.getPredictionHistory('h1');
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
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
          Prediction History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Historical record of all cardiovascular disease risk predictions
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <PredictionHistoryTable history={history} />
        </CardContent>
      </Card>
    </Box>
  );
}