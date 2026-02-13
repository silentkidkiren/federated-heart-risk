import React, { useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './PredictionPanel.css';

const API_BASE = '/api';

const FEATURE_INPUTS = [
  { name: 'age', label: 'Age', min: 30, max: 80, default: 55 },
  { name: 'sex', label: 'Sex (0=F, 1=M)', min: 0, max: 1, default: 1 },
  { name: 'chest_pain_type', label: 'Chest Pain Type', min: 0, max: 3, default: 2 },
  { name: 'resting_bp', label: 'Resting BP (mm Hg)', min: 90, max: 200, default: 140 },
  { name: 'cholesterol', label: 'Cholesterol (mg/dl)', min: 120, max: 400, default: 250 },
  { name: 'fasting_bs', label: 'Fasting Blood Sugar >120', min: 0, max: 1, default: 0 },
  { name: 'resting_ecg', label: 'Resting ECG', min: 0, max: 2, default: 1 },
  { name: 'max_heart_rate', label: 'Max Heart Rate', min: 70, max: 200, default: 150 },
  { name: 'exercise_angina', label: 'Exercise Angina', min: 0, max: 1, default: 1 },
  { name: 'oldpeak', label: 'ST Depression', min: 0, max: 6, step: 0.1, default: 2.5 },
  { name: 'st_slope', label: 'ST Slope', min: 0, max: 2, default: 1 },
  { name: 'ca', label: 'Major Vessels', min: 0, max: 3, default: 1 },
  { name: 'thal', label: 'Thalassemia', min: 0, max: 2, default: 2 }
];

function PredictionPanel() {
  const [features, setFeatures] = useState(
    FEATURE_INPUTS.reduce((acc, input) => ({
      ...acc,
      [input.name]: input.default
    }), {})
  );

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFeatures(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const featureArray = FEATURE_INPUTS.map(input => features[input.name]);
      
      // Normalize features (simple min-max scaling)
      const normalizedFeatures = featureArray.map((val, idx) => {
        const input = FEATURE_INPUTS[idx];
        return (val - input.min) / (input.max - input.min);
      });

      const response = await axios.post(`${API_BASE}/predict`, {
        features: normalizedFeatures
      });

      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Prediction failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = prediction?.feature_importance.slice(0, 8).map(item => ({
    name: item.feature,
    value: Math.abs(item.shap_value) * 100
  })) || [];

  return (
    <div className="prediction-panel">
      <div className="panel-grid">
        {/* Input Form */}
        <div className="input-section">
          <h3>Patient Information</h3>
          <div className="input-grid">
            {FEATURE_INPUTS.map(input => (
              <div key={input.name} className="input-group">
                <label>{input.label}</label>
                <input
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step || 1}
                  value={features[input.name]}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                />
              </div>
            ))}
          </div>
          
          <button 
            className="predict-button"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Assess Risk'}
          </button>
        </div>

        {/* Results */}
        {prediction && (
          <div className="results-section">
            <div className="risk-result">
              <h3>Risk Assessment</h3>
              <div className={`risk-badge ${prediction.risk_level.toLowerCase()}`}>
                {prediction.risk_level} Risk
              </div>
              <div className="confidence">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </div>
              <div className="prediction-value">
                Risk Score: {(prediction.prediction * 100).toFixed(1)}%
              </div>
            </div>

            <div className="feature-importance">
              <h3>Top Contributing Factors</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#667eea">
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={index < 3 ? '#ef4444' : '#667eea'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {prediction.note && (
              <div className="note">
                ℹ️ {prediction.note}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionPanel;

