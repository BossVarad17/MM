import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Wifi, Bell, Shield, Database, Palette, Zap } from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [dataRetention, setDataRetention] = useState('30');
  const [theme, setTheme] = useState('dark');
  const [alertThresholds, setAlertThresholds] = useState({
    temperature: '220',
    rpm: '6000',
    battery: '11.5'
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-purple-400" />
            Settings & Configuration
          </h1>
          <p className="text-gray-400">Customize your MechaMind+ experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connection Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-blue-400" />
            Connection Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Auto-Connect to OBD-II</label>
                <p className="text-gray-400 text-sm">Automatically connect when device is detected</p>
              </div>
              <button
                onClick={() => setAutoConnect(!autoConnect)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoConnect ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoConnect ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Connection Port</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option>COM3 (ELM327)</option>
                <option>COM4</option>
                <option>Bluetooth</option>
                <option>USB</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Baud Rate</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option>38400</option>
                <option>9600</option>
                <option>115200</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-400" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Enable Notifications</label>
                <p className="text-gray-400 text-sm">Receive alerts for fault codes and issues</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                'Critical fault codes',
                'Temperature warnings',
                'Battery alerts',
                'Maintenance reminders'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alert Thresholds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-400" />
            Alert Thresholds
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Temperature Alert (°F)</label>
              <input
                type="number"
                value={alertThresholds.temperature}
                onChange={(e) => setAlertThresholds({...alertThresholds, temperature: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">RPM Alert Threshold</label>
              <input
                type="number"
                value={alertThresholds.rpm}
                onChange={(e) => setAlertThresholds({...alertThresholds, rpm: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Low Battery Voltage (V)</label>
              <input
                type="number"
                step="0.1"
                value={alertThresholds.battery}
                onChange={(e) => setAlertThresholds({...alertThresholds, battery: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-green-400" />
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Data Retention Period</label>
              <select 
                value={dataRetention} 
                onChange={(e) => setDataRetention(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                Clear All Data
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Export Data
              </button>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm">Storage Used: 45.2 MB / 500 MB</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Security & Privacy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded" />
                <span className="text-gray-300">Enable data encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded" />
                <span className="text-gray-300">Require authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded" />
                <span className="text-gray-300">Share anonymous usage data</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-left">
                Change Password
              </button>
              <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-left">
                Export Settings
              </button>
              <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-left">
                Reset to Defaults
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}