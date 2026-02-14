// File: src/components/common/LogsConsole.jsx

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import {
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

export default function LogsConsole({ logs, maxHeight = '400px' }) {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <ErrorIcon sx={{ fontSize: 16 }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 16 }} />;
      case 'info':
      default:
        return <InfoIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        bgcolor: '#1E1E1E',
        borderRadius: 2,
        p: 2,
        maxHeight,
        overflowY: 'auto',
        fontFamily: 'monospace',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#2D2D2D',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#555',
          borderRadius: '4px',
          '&:hover': {
            background: '#777',
          },
        },
      }}
    >
      {logs.length === 0 ? (
        <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 4 }}>
          No logs available
        </Typography>
      ) : (
        logs.map((log) => (
          <Box
            key={log.id}
            sx={{
              mb: 1.5,
              pb: 1.5,
              borderBottom: '1px solid #2D2D2D',
              '&:last-child': {
                borderBottom: 'none',
                mb: 0,
                pb: 0,
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Typography
                variant="caption"
                sx={{
                  color: '#888',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                }}
              >
                [{formatTimestamp(log.timestamp)}]
              </Typography>
              <Chip
                icon={getSeverityIcon(log.severity)}
                label={log.severity.toUpperCase()}
                size="small"
                color={getSeverityColor(log.severity)}
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              />
              {log.source && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#05BFDB',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                  }}
                >
                  {log.source}
                </Typography>
              )}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#E0E0E0',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                wordBreak: 'break-word',
              }}
            >
              {log.message}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}