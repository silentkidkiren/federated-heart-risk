// File: src/services/api.js

import { mockApi } from './mockApi';

const BASE_URL = import.meta.env.VITE_API_BASE;

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) throw new Error("API error");

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, using mock API");
    throw error;
  }
}

export const api = {
  async getGlobalStatus() {
    try {
      return await request("/api/admin/global-status");
    } catch {
      return mockApi.getGlobalModelStatus();
    }
  },

  async predict(data) {
    try {
      return await request("/api/hospital/1/predict", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch {
      return mockApi.predictDisease(data);
    }
  },

  async startTraining() {
    try {
      return await request("/start-training", { method: "POST" });
    } catch {
      return mockApi.startTraining("h1");
    }
  }
};
