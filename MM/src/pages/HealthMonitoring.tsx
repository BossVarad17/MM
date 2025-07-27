import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Battery, Thermometer, Droplets, Zap, Gauge } from 'lucide-react';

const healthSystems = [
  {
    name: 'Engine',
    icon: Zap,
    score: 87,
    status: 'Good',
    color: 'from-green-500 to-green-400',
    issues: ['Minor oil leak detected', 'Air filter needs replacement soon'],
    lastMaintenance: '2024-01-10'
  },
  {
    name: 'Battery',
    icon: Battery,
    score: 72,
    status: 'Fair',
    color: 'from-yellow-500 to-yellow-400',
    issues: ['Voltage slightly low', 'Consider replacement in 6 months'],
    lastMaintenance: '2023-11-15'
  },
  {
    name: 'Cooling System',
    icon: Thermometer,
    score: 94,
    status: 'Excellent',
    color: 'from-blue-500 to-blue-400',
    issues: [],
    lastMaintenance: '2024-01-05'
  },
  {
    name: 'Brake System',
    icon: Gauge,
    score: 65,
    status: 'Needs Attention',
    color: 'from-orange-500 to-orange-400',
    issues: ['Front brake pads worn', 'Brake fluid level low'],
    lastMaintenance: '2023-12-20'
  },
  {
    name: 'Fuel System',
    icon: Droplets,
    score: 89,
    status: 'Good',
    color: 'from-purple-500 to-purple-400',
    issues: ['Fuel filter replacement due'],
    lastMaintenance: '2024-01-08'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Excellent': return 'text-green-400';
    case 'Good': return 'text-blue-400';
    case 'Fair': return 'text-yellow-400';
    case 'Needs Attention': return 'text-orange-400';
    default: return 'text-gray-400';
  }
};

export function HealthMonitoring() {
  const averageHealth = Math.round(healthSystems.reduce((sum, system) => sum + system.score, 0) / healthSystems.length);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-400" />
            Health Monitoring
          </h1>
          <p className="text-gray-400">Comprehensive subsystem health analysis and scoring</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-1">{averageHealth}/100</div>
          <div className="text-sm text-gray-400">Overall Health</div>
        </div>
      </div>

      {/* Overall Health Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Health Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">2</div>
            <div className="text-sm text-gray-400">Excellent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">2</div>
            <div className="text-sm text-gray-400">Good</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-sm text-gray-400">Fair</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">1</div>
            <div className="text-sm text-gray-400">Needs Attention</div>
          </div>
        </div>
      </motion.div>

      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthSystems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <system.icon className="w-6 h-6 text-gray-300" />
                <h3 className="text-xl font-semibold text-white">{system.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{system.score}/100</div>
                <div className={`text-sm font-medium ${getStatusColor(system.status)}`}>
                  {system.status}
                </div>
              </div>
            </div>

            {/* Health Score Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${system.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${system.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>

            {/* Issues */}
            {system.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Issues:</h4>
                <ul className="space-y-1">
                  {system.issues.map((issue, issueIndex) => (
                    <li key={issueIndex} className="text-sm text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {system.issues.length === 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  No issues detected
                </div>
              </div>
            )}

            {/* Last Maintenance */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Last Maintenance:</span>
              <span className="text-white">{system.lastMaintenance}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Maintenance Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-orange-300">Schedule brake inspection within 2 weeks</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-yellow-300">Consider battery replacement in next 6 months</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-blue-300">Fuel filter replacement due in 1 month</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}