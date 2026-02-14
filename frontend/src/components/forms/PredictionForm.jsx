// File: src/components/forms/PredictionForm.jsx

import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

export default function PredictionForm({ formData, onChange, disabled }) {
  const handleChange = (field) => (event) => {
    onChange(field, event.target.value);
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange('age')}
          disabled={disabled}
          required
          InputProps={{ inputProps: { min: 0, max: 120 } }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Sex"
          value={formData.sex}
          onChange={handleChange('sex')}
          disabled={disabled}
          required
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Chest Pain Type"
          value={formData.chestPainType}
          onChange={handleChange('chestPainType')}
          disabled={disabled}
          required
        >
          <MenuItem value="ATA">Atypical Angina</MenuItem>
          <MenuItem value="NAP">Non-Anginal Pain</MenuItem>
          <MenuItem value="ASY">Asymptomatic</MenuItem>
          <MenuItem value="TA">Typical Angina</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Resting Blood Pressure (mm Hg)"
          type="number"
          value={formData.restingBP}
          onChange={handleChange('restingBP')}
          disabled={disabled}
          required
          InputProps={{ inputProps: { min: 0, max: 300 } }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Cholesterol (mg/dL)"
          type="number"
          value={formData.cholesterol}
          onChange={handleChange('cholesterol')}
          disabled={disabled}
          required
          InputProps={{ inputProps: { min: 0, max: 600 } }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Fasting Blood Sugar"
          value={formData.fastingBS}
          onChange={handleChange('fastingBS')}
          disabled={disabled}
          required
        >
          <MenuItem value="0">Normal (&lt; 120 mg/dL)</MenuItem>
          <MenuItem value="1">Elevated (&gt; 120 mg/dL)</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Resting ECG"
          value={formData.restingECG}
          onChange={handleChange('restingECG')}
          disabled={disabled}
          required
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="ST">ST-T Wave Abnormality</MenuItem>
          <MenuItem value="LVH">Left Ventricular Hypertrophy</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Maximum Heart Rate"
          type="number"
          value={formData.maxHR}
          onChange={handleChange('maxHR')}
          disabled={disabled}
          required
          InputProps={{ inputProps: { min: 60, max: 220 } }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Exercise Induced Angina"
          value={formData.exerciseAngina}
          onChange={handleChange('exerciseAngina')}
          disabled={disabled}
          required
        >
          <MenuItem value="Y">Yes</MenuItem>
          <MenuItem value="N">No</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Oldpeak (ST Depression)"
          type="number"
          value={formData.oldpeak}
          onChange={handleChange('oldpeak')}
          disabled={disabled}
          required
          InputProps={{ inputProps: { min: -3, max: 7, step: 0.1 } }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="ST Slope"
          value={formData.stSlope}
          onChange={handleChange('stSlope')}
          disabled={disabled}
          required
        >
          <MenuItem value="Up">Upsloping</MenuItem>
          <MenuItem value="Flat">Flat</MenuItem>
          <MenuItem value="Down">Downsloping</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}