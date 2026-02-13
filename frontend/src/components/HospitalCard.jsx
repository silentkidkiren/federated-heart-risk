import React from 'react';
import './HospitalCard.css';

function HospitalCard({ name, samples, status }) {
  const getStatusIcon = () => {
    switch(status) {
      case 'idle':
        return '⏸️';
      case 'training':
        return '🔄';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⏸️';
    }
  };

  return (
    <div className={`hospital-card ${status}`}>
      <div className="hospital-header">
        <h3>{name}</h3>
        <span className="status-icon">{getStatusIcon()}</span>
      </div>
      
      <div className="hospital-info">
        <div className="info-item">
          <span className="info-label">Training Samples</span>
          <span className="info-value">{samples}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Privacy</span>
          <span className="info-value">🔒 Protected</span>
        </div>
      </div>
      
      {status === 'training' && (
        <div className="training-indicator">
          <div className="spinner"></div>
          <span>Local training in progress...</span>
        </div>
      )}
    </div>
  );
}

export default HospitalCard;
