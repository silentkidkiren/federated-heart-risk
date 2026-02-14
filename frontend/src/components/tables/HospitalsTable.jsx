// File: src/components/tables/HospitalsTable.jsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from '@mui/material';
import {
  Circle as CircleIcon,
} from '@mui/icons-material';

export default function HospitalsTable({ hospitals }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'training':
        return 'warning';
      case 'offline':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    const color = getStatusColor(status);
    return (
      <CircleIcon 
        sx={{ 
          fontSize: 12, 
          color: `${color}.main`,
          mr: 0.5,
        }} 
      />
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 600 }}>Hospital</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Update</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Accuracy</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Total Samples</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Rounds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow 
              key={hospital.id}
              sx={{ 
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>{hospital.name}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  {getStatusIcon(hospital.status)}
                  <Chip
                    label={hospital.status}
                    size="small"
                    color={getStatusColor(hospital.status)}
                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                {formatTimestamp(hospital.lastUpdate)}
              </TableCell>
              <TableCell>
                {(hospital.accuracy * 100).toFixed(2)}%
              </TableCell>
              <TableCell>{hospital.totalSamples.toLocaleString()}</TableCell>
              <TableCell>{hospital.roundsParticipated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}