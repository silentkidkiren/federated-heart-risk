// File: src/pages/admin/FederatedRounds.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { mockApi } from '../../services/mockApi';
import RoundsTable from '../../components/tables/RoundsTable';

export default function FederatedRounds() {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    loadRounds();
  }, []);

  const loadRounds = async () => {
    try {
      const data = await mockApi.getFederatedRounds();
      setRounds(data);
    } catch (error) {
      console.error('Error loading rounds:', error);
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
          Federated Training Rounds
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Complete history of federated learning rounds with aggregated metrics
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <RoundsTable rounds={rounds} />
        </CardContent>
      </Card>
    </Box>
  );
}