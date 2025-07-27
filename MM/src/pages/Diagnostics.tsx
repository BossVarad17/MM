import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const faultCodes = [
  {
    code: 'P0302',
    description: 'Cylinder 2 Misfire Detected',
    severity: 'high',
    system: 'Engine',
    timestamp: '2024-01-15 14:30:22',
    solution: 'Check spark plug and ignition coil for cylinder 2'
  },
  {
    code: 'P0171',
    description: 'System Too Lean (Bank 1)',
    severity: 'medium',
    system: 'Fuel',
    timestamp: '2024-01-15 13:45:18',
    solution: 'Inspect air intake system and fuel injectors'
  },
  {
    code: 'B1234',
    description: 'Battery Voltage Low',
    severity: 'low',
    system: 'Electrical',
    timestamp: '2024-01-15 12:20:45',
    solution: 'Test battery and charging system'
  },
  {
    code: 'C0561',
    description: 'ABS System Malfunction',
    severity: 'high',
    system: 'Brake',
    timestamp: '2024-01-15 11:15:30',
    solution: 'Inspect ABS sensors and brake fluid level'
  }
];

const severityColors = {
  high: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400', icon: XCircle },
  medium: { bg: 'bg-yellow-900/20', border: 'border-yellow-500', text: 'text-yellow-400', icon: AlertTriangle },
  low: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', icon: CheckCircle }
};

export function Diagnostics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredCodes = faultCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || code.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Fault Diagnostics</h1>
          <p className="text-gray-400">DTC codes analysis and troubleshooting recommendations</p>
        </div>
        <div className="flex items-center gap-2 bg-red-900/20 border border-red-500 px-4 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">{faultCodes.length} Issues Found</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search fault codes or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none"
          >
            <option value="all">All Severities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Fault Codes List */}
      <div className="space-y-4">
        {filteredCodes.map((fault, index) => {
          const severity = severityColors[fault.severity];
          const IconComponent = severity.icon;
          
          return (
            <motion.div
              key={fault.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${severity.bg} border ${severity.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-6 h-6 ${severity.text}`} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{fault.code}</h3>
                    <p className="text-gray-300">{fault.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${severity.bg} ${severity.text} border ${severity.border}`}>
                    {fault.severity.toUpperCase()}
                  </span>
                  <p className="text-gray-400 text-sm mt-1">{fault.timestamp}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <span className="text-gray-400 text-sm">Affected System</span>
                  <p className="text-white font-medium">{fault.system}</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <span className="text-gray-400 text-sm">Recommended Action</span>
                  <p className="text-white font-medium">{fault.solution}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                  Mark Resolved
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Issues Found</h3>
          <p className="text-gray-400">Your search didn't match any fault codes.</p>
        </div>
      )}
    </div>
  );
}