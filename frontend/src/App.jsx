import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalCard from './components/HospitalCard';
import MetricsChart from './components/MetricsChart';
import PredictionPanel from './components/PredictionPanel';
import './App.css';

const API_BASE = '/api';

function App() {
  const [trainingStatus, setTrainingStatus] = useState({
    status: 'idle',
    current_round: 0,
    total_rounds: 0,
    progress: 0
  });
  
  const [metrics, setMetrics] = useState({
    total_rounds: 0,
    average_accuracy: 0,
    latest_accuracy: 0,
    improvement: 0,
    rounds: []
  });
  
  const [clients, setClients] = useState([]);
  const [isPolling, setIsPolling] = useState(false);

  // Fetch clients on mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Poll training status
  useEffect(() => {
    let interval;
    if (isPolling || trainingStatus.status === 'training') {
      interval = setInterval(() => {
        fetchTrainingStatus();
        fetchMetrics();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPolling, trainingStatus.status]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE}/clients`);
      setClients(response.data.clients);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const fetchTrainingStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE}/training-status`);
      setTrainingStatus(response.data);
      
      if (response.data.status === 'completed' || response.data.status === 'error') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Failed to fetch training status:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${API_BASE}/metrics`);
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const handleStartTraining = async () => {
    try {
      await axios.post(`${API_BASE}/start-training`);
      setIsPolling(true);
      setTrainingStatus({ ...trainingStatus, status: 'training' });
    } catch (error) {
      console.error('Failed to start training:', error);
      alert('Failed to start training: ' + error.response?.data?.detail || error.message);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'idle': return '#6b7280';
      case 'training': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏥 Federated Cardiovascular Risk Prediction</h1>
          <p className="subtitle">Privacy-Preserving Machine Learning Demo</p>
        </div>
      </header>

      <main className="main-content">
        {/* Control Panel */}
        <section className="control-panel">
          <div className="status-section">
            <div className="status-indicator">
              <div 
                className="status-dot" 
                style={{ backgroundColor: getStatusColor(trainingStatus.status) }}
              />
              <span className="status-text">
                Status: <strong>{trainingStatus.status.toUpperCase()}</strong>
              </span>
            </div>
            
            {trainingStatus.status === 'training' && (
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trainingStatus.progress * 100}%` }}
                  />
                </div>
                <span className="progress-text">
                  Round {trainingStatus.current_round} / {trainingStatus.total_rounds}
                </span>
              </div>
            )}
          </div>

          <button
            className="start-button"
            onClick={handleStartTraining}
            disabled={trainingStatus.status === 'training'}
          >
            {trainingStatus.status === 'training' ? 'Training...' : 'Start Federated Training'}
          </button>
        </section>

        {/* Hospital Cards */}
        <section className="hospitals-section">
          <h2>Participating Hospitals</h2>
          <div className="hospitals-grid">
            {clients.map((client) => (
              <HospitalCard
                key={client.id}
                name={client.name}
                samples={client.samples}
                status={trainingStatus.status}
              />
            ))}
          </div>
        </section>

        {/* Central Server */}
        <section className="server-section">
          <div className="server-card">
            <h3>🖥️ Central Aggregation Server</h3>
            <p>Combines models without accessing raw patient data</p>
            {metrics.latest_accuracy > 0 && (
              <div className="server-metrics">
                <div className="metric">
                  <span className="metric-label">Global Accuracy</span>
                  <span className="metric-value">
                    {(metrics.latest_accuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Improvement</span>
                  <span className="metric-value">
                    +{(metrics.improvement * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Metrics Chart */}
        {metrics.rounds.length > 0 && (
          <section className="chart-section">
            <h2>Training Progress</h2>
            <MetricsChart data={metrics.rounds} />
          </section>
        )}

        {/* Prediction Panel */}
        <section className="prediction-section">
          <h2>Patient Risk Assessment</h2>
          <PredictionPanel />
        </section>
      </main>

      <footer className="app-footer">
        <p>Demo System • Not for Clinical Use • Federated Learning Proof of Concept</p>
      </footer>
    </div>
  );
}

export default App;

