import React from 'react';
import { FaSearch, FaBell, FaEnvelope, FaExpand, FaPowerOff, FaBars } from 'react-icons/fa';

const Topbar = () => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <FaBars className="text-gray-500 cursor-pointer" />
        <div className="relative text-gray-400">
          <input
            type="text"
            placeholder="Search projects"
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute left-2 top-2.5" />
        </div>
      </div>

      <div className="flex items-center space-x-6 text-gray-500">
        <FaExpand className="cursor-pointer hover:text-purple-600" title="Fullscreen" />
        <FaEnvelope className="cursor-pointer hover:text-purple-600" title="Messages" />
        <div className="relative cursor-pointer hover:text-purple-600">
          <FaBell />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-white"></span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-600">
          <img
            src="https://i.pravatar.cc/32?u=userid"
            alt="User avatar"
            className="rounded-full w-8 h-8"
          />
          <span className="text-sm font-semibold text-gray-700">David Greymaax</span>
        </div>
        <FaPowerOff className="cursor-pointer hover:text-purple-600" title="Logout" />
      </div>
    </header>
  );
};

export default Topbar;
