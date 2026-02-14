// File: src/pages/admin/Hospitals.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { mockApi } from '../../services/mockApi';
import HospitalsTable from '../../components/tables/HospitalsTable';

export default function Hospitals() {
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    loadHospitals();
    const interval = setInterval(loadHospitals, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadHospitals = async () => {
    try {
      const data = await mockApi.getHospitalsStatus();
      setHospitals(data);
    } catch (error) {
      console.error('Error loading hospitals:', error);
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
          Participating Hospitals
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Real-time monitoring of hospital clients in the federated network
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <HospitalsTable hospitals={hospitals} />
        </CardContent>
      </Card>
    </Box>
  );
}