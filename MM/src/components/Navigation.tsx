import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Gauge, 
  AlertTriangle, 
  Bot, 
  Heart, 
  FileText, 
  Settings,
  Car,
  LogOut
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { path: '/diagnostics', icon: AlertTriangle, label: 'Diagnostics' },
  { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { path: '/health', icon: Heart, label: 'Health Monitor' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
      <div className="flex items-center gap-3 p-6 border-b border-gray-800">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
          <Car className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">MechaMind+</h1>
          <p className="text-xs text-gray-400">Vehicle Diagnostics</p>
        </div>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* User Profile */}
      <div className="absolute bottom-20 left-4 right-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.name}</p>
            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">Connected</span>
        </div>
        <p className="text-xs text-gray-400">OBD-II Interface Active</p>
      </div>
    </nav>
  );
}