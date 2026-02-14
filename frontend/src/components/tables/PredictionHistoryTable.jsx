// File: src/components/tables/PredictionHistoryTable.jsx

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function Row({ row }) {
  const [open, setOpen] = useState(false);

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

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const shapData = Object.entries(row.shapValues || {}).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    value: parseFloat(value),
  }));

  return (
    <>
      <TableRow sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontWeight: 600 }}>{row.patientId}</TableCell>
        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          {formatTimestamp(row.timestamp)}
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.riskScore}%
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={row.classification}
            size="small"
            color={getClassificationColor(row.classification)}
            sx={{ fontWeight: 600 }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                SHAP Feature Contributions
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shapData} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" style={{ fontSize: '0.75rem' }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {shapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#D32F2F' : '#2E7D32'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function PredictionHistoryTable({ history }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 600 }}>Patient ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Risk Score</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Classification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}