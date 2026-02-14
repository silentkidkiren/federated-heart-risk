// File: src/services/mockApi.js

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate mock data
export const mockApi = {
  // Admin APIs
  async getGlobalModelStatus() {
    await delay(300);
    return {
      version: '2.4.1',
      totalRounds: 47,
      connectedHospitals: 8,
      accuracy: 0.8923,
      loss: 0.2134,
      lastUpdate: new Date().toISOString(),
      status: 'active',
    };
  },

  async getFederatedRounds() {
    await delay(400);
    const rounds = [];
    for (let i = 47; i >= 38; i--) {
      rounds.push({
        id: i,
        roundNumber: i,
        accuracy: 0.85 + Math.random() * 0.05,
        loss: 0.25 - Math.random() * 0.05,
        participatingClients: Math.floor(6 + Math.random() * 3),
        timestamp: new Date(Date.now() - (47 - i) * 3600000).toISOString(),
        duration: Math.floor(120 + Math.random() * 60),
        status: 'completed',
      });
    }
    return rounds;
  },

  async getHospitalsStatus() {
    await delay(350);
    return [
      {
        id: 'h1',
        name: 'Apollo Hospital Chennai',
        status: 'online',
        lastUpdate: new Date(Date.now() - 120000).toISOString(),
        accuracy: 0.8756,
        totalSamples: 3421,
        roundsParticipated: 45,
      },
      {
        id: 'h2',
        name: 'AIIMS Delhi',
        status: 'training',
        lastUpdate: new Date(Date.now() - 300000).toISOString(),
        accuracy: 0.8921,
        totalSamples: 5234,
        roundsParticipated: 47,
      },
      {
        id: 'h3',
        name: 'Fortis Bangalore',
        status: 'online',
        lastUpdate: new Date(Date.now() - 180000).toISOString(),
        accuracy: 0.8634,
        totalSamples: 2876,
        roundsParticipated: 43,
      },
      {
        id: 'h4',
        name: 'Max Hospital Mumbai',
        status: 'offline',
        lastUpdate: new Date(Date.now() - 7200000).toISOString(),
        accuracy: 0.8512,
        totalSamples: 2234,
        roundsParticipated: 40,
      },
      {
        id: 'h5',
        name: 'Christian Medical College Vellore',
        status: 'online',
        lastUpdate: new Date(Date.now() - 240000).toISOString(),
        accuracy: 0.8845,
        totalSamples: 4123,
        roundsParticipated: 46,
      },
      {
        id: 'h6',
        name: 'Manipal Hospital',
        status: 'training',
        lastUpdate: new Date(Date.now() - 90000).toISOString(),
        accuracy: 0.8698,
        totalSamples: 3098,
        roundsParticipated: 44,
      },
      {
        id: 'h7',
        name: 'Medanta Gurugram',
        status: 'online',
        lastUpdate: new Date(Date.now() - 420000).toISOString(),
        accuracy: 0.8734,
        totalSamples: 3567,
        roundsParticipated: 42,
      },
      {
        id: 'h8',
        name: 'Narayana Health Bangalore',
        status: 'online',
        lastUpdate: new Date(Date.now() - 150000).toISOString(),
        accuracy: 0.8812,
        totalSamples: 3789,
        roundsParticipated: 45,
      },
    ];
  },

  async getSystemLogs() {
    await delay(250);
    return [
      {
        id: 1,
        timestamp: new Date(Date.now() - 120000).toISOString(),
        severity: 'info',
        message: 'Federated round 47 completed successfully',
        source: 'FL-Server',
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 180000).toISOString(),
        severity: 'info',
        message: 'Client h2 (AIIMS Delhi) uploaded model update',
        source: 'FL-Server',
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 240000).toISOString(),
        severity: 'warning',
        message: 'Client h4 (Max Hospital Mumbai) connection timeout',
        source: 'FL-Server',
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 300000).toISOString(),
        severity: 'info',
        message: 'Global model aggregation started for round 47',
        source: 'Aggregator',
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 360000).toISOString(),
        severity: 'info',
        message: 'Model weights received from 7 clients',
        source: 'FL-Server',
      },
      {
        id: 6,
        timestamp: new Date(Date.now() - 420000).toISOString(),
        severity: 'error',
        message: 'Client h4 failed to send update within timeout period',
        source: 'FL-Server',
      },
      {
        id: 7,
        timestamp: new Date(Date.now() - 480000).toISOString(),
        severity: 'info',
        message: 'Round 46 completed with 8 participants',
        source: 'FL-Server',
      },
    ];
  },

  async getGlobalMetricsHistory() {
    await delay(300);
    const history = [];
    for (let i = 0; i < 20; i++) {
      history.push({
        round: 28 + i,
        accuracy: 0.78 + (i * 0.005) + (Math.random() * 0.01),
        loss: 0.35 - (i * 0.005) - (Math.random() * 0.01),
      });
    }
    return history;
  },

  // Hospital APIs
  async getHospitalDashboard(hospitalId) {
    await delay(300);
    return {
      hospitalId,
      hospitalName: 'Apollo Hospital Chennai',
      modelVersion: '2.4.1-local',
      lastSync: new Date(Date.now() - 3600000).toISOString(),
      lastTrainingAccuracy: 0.8756,
      lastTrainingLoss: 0.2345,
      modelStatus: 'ready',
      totalPredictions: 1243,
      totalTrainingSessions: 45,
    };
  },

  async startTraining(hospitalId) {
    await delay(500);
    return {
      success: true,
      trainingId: `train_${Date.now()}`,
      message: 'Training started successfully',
    };
  },

  async getTrainingLogs(trainingId) {
    await delay(200);
    return [
      { timestamp: new Date().toISOString(), message: 'Initializing training session...' },
      { timestamp: new Date().toISOString(), message: 'Loading local dataset: 3421 samples' },
      { timestamp: new Date().toISOString(), message: 'Model architecture verified' },
      { timestamp: new Date().toISOString(), message: 'Starting epoch 1/5...' },
    ];
  },

  async getTrainingMetrics(trainingId) {
    await delay(300);
    const metrics = [];
    for (let i = 1; i <= 5; i++) {
      metrics.push({
        epoch: i,
        accuracy: 0.75 + (i * 0.02) + (Math.random() * 0.01),
        loss: 0.35 - (i * 0.03) - (Math.random() * 0.01),
      });
    }
    return metrics;
  },

  async predictDisease(patientData) {
    await delay(600);
    const riskScore = Math.random() * 100;
    let classification = 'Low';
    if (riskScore > 70) classification = 'High';
    else if (riskScore > 40) classification = 'Medium';

    return {
      patientId: `P${Date.now()}`,
      riskScore: riskScore.toFixed(2),
      classification,
      timestamp: new Date().toISOString(),
      shapValues: {
        age: (Math.random() - 0.5) * 0.4,
        sex: (Math.random() - 0.5) * 0.3,
        chestPainType: (Math.random() - 0.5) * 0.35,
        restingBP: (Math.random() - 0.5) * 0.25,
        cholesterol: (Math.random() - 0.5) * 0.3,
        fastingBS: (Math.random() - 0.5) * 0.2,
        restingECG: (Math.random() - 0.5) * 0.15,
        maxHR: (Math.random() - 0.5) * 0.28,
        exerciseAngina: (Math.random() - 0.5) * 0.32,
        oldpeak: (Math.random() - 0.5) * 0.27,
        stSlope: (Math.random() - 0.5) * 0.22,
      },
    };
  },

  async getPredictionHistory(hospitalId) {
    await delay(400);
    const history = [];
    for (let i = 0; i < 15; i++) {
      const riskScore = 20 + Math.random() * 70;
      let classification = 'Low';
      if (riskScore > 70) classification = 'High';
      else if (riskScore > 40) classification = 'Medium';

      history.push({
        id: `pred_${1000 + i}`,
        patientId: `P${10000 + i}`,
        timestamp: new Date(Date.now() - i * 3600000 * 2).toISOString(),
        riskScore: riskScore.toFixed(2),
        classification,
        shapValues: {
          age: (Math.random() - 0.5) * 0.4,
          sex: (Math.random() - 0.5) * 0.3,
          chestPainType: (Math.random() - 0.5) * 0.35,
          restingBP: (Math.random() - 0.5) * 0.25,
          cholesterol: (Math.random() - 0.5) * 0.3,
        },
      });
    }
    return history;
  },

  async getLocalMetrics(hospitalId) {
    await delay(350);
    const metrics = [];
    for (let i = 0; i < 15; i++) {
      metrics.push({
        round: 33 + i,
        accuracy: 0.78 + (i * 0.006) + (Math.random() * 0.01),
        loss: 0.32 - (i * 0.008) - (Math.random() * 0.01),
      });
    }
    return metrics;
  },
};