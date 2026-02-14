import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PredictionResult({ prediction }) {
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

  const getClassificationIcon = (classification) => {
    switch (classification) {
      case 'High':
        return <ErrorIcon sx={{ fontSize: 48 }} />;
      case 'Medium':
        return <WarningIcon sx={{ fontSize: 48 }} />;
      case 'Low':
        return <CheckCircleIcon sx={{ fontSize: 48 }} />;
      default:
        return null;
    }
  };

  const shapData = Object.entries(prediction.shapValues).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    fullName: key,
    value: parseFloat(value),
  })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <>
      <Card
        sx={{
          mb: 3,
          bgcolor: `${getClassificationColor(prediction.classification)}.lighter`,
          border: 2,
          borderColor: `${getClassificationColor(prediction.classification)}.main`,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Risk Assessment Result
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient ID: {prediction.patientId}
              </Typography>
            </Box>
            <Box
              sx={{
                color: `${getClassificationColor(prediction.classification)}.main`,
              }}
            >
              {getClassificationIcon(prediction.classification)}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Risk Score
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {prediction.riskScore}%
              </Typography>
            </Box>
            <Chip
              label={`${prediction.classification} Risk`}
              color={getClassificationColor(prediction.classification)}
              sx={{ fontSize: '1rem', py: 2.5, px: 1, fontWeight: 700 }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            SHAP Explainability
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Feature contributions to the prediction (positive values increase risk, negative values decrease risk)
          </Typography>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={shapData} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis type="number" style={{ fontSize: '0.75rem' }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                style={{ fontSize: '0.75rem' }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                }}
                formatter={(value) => [value.toFixed(4), 'Impact']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {shapData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 0 ? '#D32F2F' : '#2E7D32'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Feature Contribution Details
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Impact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Effect</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shapData.slice(0, 8).map((item) => (
                  <TableRow key={item.fullName}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: item.value > 0 ? 'error.main' : 'success.main',
                        }}
                      >
                        {item.value > 0 ? '+' : ''}{item.value.toFixed(4)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.value > 0 ? 'Increases Risk' : 'Decreases Risk'}
                        size="small"
                        color={item.value > 0 ? 'error' : 'success'}
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}