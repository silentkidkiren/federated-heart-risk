import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../pages/Login';
import AdminLayout from '../layouts/AdminLayout';
import HospitalLayout from '../layouts/HospitalLayout';
import Overview from '../pages/admin/Overview';
import FederatedRounds from '../pages/admin/FederatedRounds';
import Hospitals from '../pages/admin/Hospitals';
import SystemLogs from '../pages/admin/SystemLogs';
import Dashboard from '../pages/hospital/Dashboard';
import TrainModel from '../pages/hospital/TrainModel';
import PredictDisease from '../pages/hospital/PredictDisease';
import PredictionHistory from '../pages/hospital/PredictionHistory';
import LocalMetrics from '../pages/hospital/LocalMetrics';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Overview />} />
        <Route path="federated-rounds" element={<FederatedRounds />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="system-logs" element={<SystemLogs />} />
      </Route>

      <Route path="/hospital" element={
        <ProtectedRoute allowedRole="hospital">
          <HospitalLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="train-model" element={<TrainModel />} />
        <Route path="predict-disease" element={<PredictDisease />} />
        <Route path="prediction-history" element={<PredictionHistory />} />
        <Route path="local-metrics" element={<LocalMetrics />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}