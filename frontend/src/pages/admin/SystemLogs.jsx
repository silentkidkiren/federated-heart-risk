// File: src/pages/admin/SystemLogs.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { mockApi } from '../../services/mockApi';
import LogsConsole from '../../components/common/LogsConsole';

export default function SystemLogs() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const loadLogs = async () => {
    try {
      const data = await mockApi.getSystemLogs();
      setLogs(data);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.severity === filter);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            System Logs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time system events and federated learning activities
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="info">Info</ToggleButton>
          <ToggleButton value="warning">Warning</ToggleButton>
          <ToggleButton value="error">Error</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Card>
        <CardContent>
          <LogsConsole logs={filteredLogs} />
        </CardContent>
      </Card>
    </Box>
  );
}