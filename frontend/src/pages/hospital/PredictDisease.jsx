// File: src/pages/hospital/PredictDisease.jsx

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import {
  Send as SendIcon,
} from '@mui/icons-material';
import { mockApi } from '../../services/mockApi';
import PredictionForm from '../../components/forms/PredictionForm';
import PredictionResult from '../../components/common/PredictionResult';

export default function PredictDisease() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    restingECG: '',
    maxHR: '',
    exerciseAngina: '',
    oldpeak: '',
    stSlope: '',
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handlePredict = async () => {
    // Validate form
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await mockApi.predictDisease(formData);
      setPrediction(result);
    } catch (err) {
      setError('Failed to generate prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      chestPainType: '',
      restingBP: '',
      cholesterol: '',
      fastingBS: '',
      restingECG: '',
      maxHR: '',
      exerciseAngina: '',
      oldpeak: '',
      stSlope: '',
    });
    setPrediction(null);
    setError('');
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          CVD Risk Prediction
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Assess cardiovascular disease risk using patient clinical data
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={prediction ? 6 : 12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Patient Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter patient clinical parameters for risk assessment
              </Typography>

              <PredictionForm
                formData={formData}
                onChange={handleFormChange}
                disabled={loading}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Box display="flex" gap={2} mt={3}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handlePredict}
                  disabled={loading}
                  fullWidth
                  size="large"
                >
                  {loading ? 'Analyzing...' : 'Predict Risk'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                  sx={{ minWidth: '120px' }}
                  size="large"
                >
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {prediction && (
          <Grid item xs={12} lg={6}>
            <PredictionResult prediction={prediction} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}