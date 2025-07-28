import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, Printer, Share2 } from 'lucide-react';

const reports = [
  {
    id: 1,
    title: 'Vehicle Health Assessment',
    type: 'Health Report',
    date: '2024-01-15',
    description: 'Comprehensive analysis of all vehicle subsystems and recommendations',
    pages: 8,
    format: 'PDF'
  },
  {
    id: 2,
    title: 'Diagnostic Fault Analysis',
    type: 'Diagnostic Report',
    date: '2024-01-14',
    description: 'Detailed analysis of DTC codes P0302, P0171, B1234, and C0561',
    pages: 5,
    format: 'PDF'
  },
  {
    id: 3,
    title: 'Performance Metrics Summary',
    type: 'Performance Report',
    date: '2024-01-13',
    description: 'Weekly performance summary with sensor data trends',
    pages: 12,
    format: 'PDF'
  },
  {
    id: 4,
    title: 'Maintenance Schedule',
    type: 'Maintenance Report',
    date: '2024-01-12',
    description: 'Upcoming maintenance items and service recommendations',
    pages: 3,
    format: 'PDF'
  }
];

const reportTypes = [
  'All Reports',
  'Health Report',
  'Diagnostic Report',
  'Performance Report',
  'Maintenance Report'
];

export function Reports() {
  const [selectedType, setSelectedType] = useState('All Reports');
  const [dateRange, setDateRange] = useState('last-week');

  const filteredReports = reports.filter(report => 
    selectedType === 'All Reports' || report.type === selectedType
  );

  const generateNewReport = () => {
    // This would trigger report generation
    console.log('Generating new report...');
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-400" />
            Reports & Analytics
          </h1>
          <p className="text-gray-400">Generate and manage vehicle diagnostic reports</p>
        </div>
        <button
          onClick={generateNewReport}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <FileText className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">Report Type</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">Date Range</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Health Summary', icon: FileText, color: 'bg-blue-600', count: '1 Ready' },
          { title: 'Fault Analysis', icon: FileText, color: 'bg-red-600', count: '2 Pending' },
          { title: 'Performance', icon: FileText, color: 'bg-green-600', count: '1 Ready' },
          { title: 'Maintenance', icon: FileText, color: 'bg-yellow-600', count: '3 Ready' }
        ].map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 text-left"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-1">{action.title}</h3>
            <p className="text-gray-400 text-sm">{action.count}</p>
          </motion.button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Recent Reports</h3>
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{report.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{report.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="bg-gray-800 px-2 py-1 rounded">{report.type}</span>
                    <span>{report.date}</span>
                    <span>{report.pages} pages</span>
                    <span>{report.format}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Quick Health Check',
            'Comprehensive Diagnostic',
            'Maintenance Schedule'
          ].map((template, index) => (
            <button
              key={template}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
            >
              <h4 className="text-white font-medium mb-2">{template}</h4>
              <p className="text-gray-400 text-sm">Generate instant report</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}