import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './page/Home';
import { AuthProvider } from './components/AuthContext';
import Protected from './page/Protected';
import ProtectedRoute from './Routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './page/Login';
import Register from './page/Register';
import PublicRoute from './Routes/PublicRoute';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<AdminPanel />} />
              <Route path="/protected" element={<Protected />} />
            </Route>
          </Routes>
          <ToastContainer />
        </AuthProvider >
      </QueryClientProvider >
    </BrowserRouter>
  );
}

export default App; 