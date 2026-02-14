// File: src/components/tables/RoundsTable.jsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

export default function RoundsTable({ rounds }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 600 }}>Round</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Accuracy</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Loss</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Participants</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => (
            <TableRow 
              key={round.id}
              sx={{ 
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>#{round.roundNumber}</TableCell>
              <TableCell>
                <Chip
                  label={`${(round.accuracy * 100).toFixed(2)}%`}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>{round.loss.toFixed(4)}</TableCell>
              <TableCell>{round.participatingClients} clients</TableCell>
              <TableCell>{round.duration}s</TableCell>
              <TableCell>
                <Chip
                  label={round.status}
                  size="small"
                  color={round.status === 'completed' ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                {formatTimestamp(round.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}