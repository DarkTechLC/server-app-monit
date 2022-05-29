import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ServerCheckProvider } from './contexts/ServerCheckContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { DashboardHome } from './pages/Dashboard';
import { DashboardNew } from './pages/Dashboard/new';
import { DashboardEdit } from './pages/Dashboard/edit';

export default function App() {
  return (
    <ThemeProvider>
      <ServerCheckProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/new" element={<DashboardNew />} />
            <Route path="/edit/:serverId" element={<DashboardEdit />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ServerCheckProvider>
    </ThemeProvider>
  );
}
