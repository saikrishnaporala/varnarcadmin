import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Uploads from './pages/Uploads';
import AllRecords from './pages/AllRecords';
import GoogleLinks from './pages/GoogleLinks';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col flex-shrink-0">
        <Topbar />
        <Toaster />
        {/* Main content */}
        <main className="flex-1 bg-white-100 p-0 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/googlelinks" element={<GoogleLinks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/allrecords" element={<AllRecords />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;