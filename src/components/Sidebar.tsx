import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaIcons, FaListAlt, FaChartBar, FaTable, FaLock, FaProjectDiagram } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col p-6">
      <div className="mb-8 flex items-center space-x-3">
        <div className="text-purple-600 text-3xl font-bold">Purple</div>
      </div>

      <div className="mb-8 flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/40?u=userid" 
          alt="User avatar"
          className="rounded-full w-10 h-10"
        />
        <div>
          <div className="font-semibold text-gray-900">David Grey. H</div>
          <div className="text-xs text-gray-400">Project Manager</div>
        </div>
      </div>

      <nav className="flex flex-col space-y-2 text-gray-600 text-sm font-semibold">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaHome /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/uploads" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaCog /> <span>Uploads</span>
        </NavLink>
        <NavLink to="/googlelinks" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaCog /> <span>Google Links</span>
        </NavLink>
        <NavLink to="/allrecords" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaIcons /> <span>All Records</span>
        </NavLink>
        <NavLink to="/forms" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaListAlt /> <span>Forms</span>
        </NavLink>
        <NavLink to="/charts" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaChartBar /> <span>Charts</span>
        </NavLink>
        <NavLink to="/tables" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaTable /> <span>Tables</span>
        </NavLink>
        <NavLink to="/sample-pages" className={({ isActive }) => isActive ? 'text-purple-600 flex items-center space-x-2' : 'flex items-center space-x-2 hover:text-purple-600'}>
          <FaLock /> <span>Sample Pages</span>
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="mb-4 text-gray-400 uppercase text-xs">Projects</div>
        <button className="w-full bg-purple-500 text-white rounded px-4 py-2 font-semibold hover:bg-purple-600">
          + Add a project
        </button>
      </div>

      <div className="mt-6 text-gray-400 text-xs">
        <div>Categories</div>
        <div className="flex space-x-3 mt-1">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full border border-red-400 bg-red-200"></span>
            <span>Free</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full border border-blue-400 bg-blue-200"></span>
            <span>Pro</span>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
