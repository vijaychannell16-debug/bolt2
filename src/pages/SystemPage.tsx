import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Server, Database, Settings, AlertTriangle,
  CheckCircle, XCircle, Activity, HardDrive, Cpu,
  Wifi, Lock, Key, Bell, Mail, Globe, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

function SystemPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('overview');

  const systemHealth = {
    status: 'healthy',
    uptime: '99.8%',
    responseTime: '120ms',
    activeUsers: 2453,
    serverLoad: 45,
    memoryUsage: 68,
    diskUsage: 34
  };

  const systemServices = [
    { name: 'Web Server', status: 'running', uptime: '15 days', cpu: 12, memory: 256 },
    { name: 'Database', status: 'running', uptime: '15 days', cpu: 8, memory: 512 },
    { name: 'Redis Cache', status: 'running', uptime: '15 days', cpu: 2, memory: 64 },
    { name: 'Email Service', status: 'running', uptime: '15 days', cpu: 1, memory: 32 },
    { name: 'File Storage', status: 'running', uptime: '15 days', cpu: 3, memory: 128 },
    { name: 'Backup Service', status: 'warning', uptime: '2 hours', cpu: 5, memory: 96 }
  ];

  const securitySettings = [
    { name: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for admin accounts' },
    { name: 'SSL/TLS Encryption', enabled: true, description: 'Encrypt all data in transit' },
    { name: 'Database Encryption', enabled: true, description: 'Encrypt sensitive data at rest' },
    { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 30 minutes of inactivity' },
    { name: 'IP Whitelist', enabled: false, description: 'Restrict admin access to specific IPs' },
    { name: 'Audit Logging', enabled: true, description: 'Log all administrative actions' }
  ];

  const notifications = [
    { id: 1, type: 'warning', message: 'Backup service restarted automatically', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Database maintenance completed successfully', time: '1 day ago' },
    { id: 3, type: 'success', message: 'Security scan completed - no issues found', time: '2 days ago' },
    { id: 4, type: 'error', message: 'Failed login attempt from unknown IP', time: '3 days ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Activity;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const handleToggleSecurity = (settingName: string) => {
    toast.success(`${settingName} ${Math.random() > 0.5 ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className={`h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50'
    }`}>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h1 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            System Management
          </h1>
          <p className={`text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Monitor system health, security, and platform configuration
          </p>
        </motion.div>

        {/* System Health Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {[
            { title: 'System Status', value: 'Healthy', icon: Shield, color: 'from-green-500 to-teal-500' },
            { title: 'Uptime', value: systemHealth.uptime, icon: Activity, color: 'from-blue-500 to-cyan-500' },
            { title: 'Response Time', value: systemHealth.responseTime, icon: Zap, color: 'from-purple-500 to-pink-500' },
            { title: 'Active Users', value: systemHealth.activeUsers.toLocaleString(), icon: Globe, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.title}
                  </h3>
                  <p className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <div className={`flex space-x-1 p-1 rounded-2xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Resource Usage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-4 rounded-xl shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Resource Usage
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Server Load', value: systemHealth.serverLoad, icon: Cpu, color: 'bg-blue-500' },
                  { name: 'Memory Usage', value: systemHealth.memoryUsage, icon: HardDrive, color: 'bg-purple-500' },
                  { name: 'Disk Usage', value: systemHealth.diskUsage, icon: Database, color: 'bg-green-500' }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${resource.color} flex items-center justify-center`}>
                        <resource.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {resource.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`w-32 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className={`h-full rounded-full ${resource.color}`}
                          style={{ width: `${resource.value}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {resource.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-4 rounded-xl shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Recent System Events
              </h3>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        {selectedTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                System Services
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Service
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Status
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Uptime
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      CPU
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Memory
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {systemServices.map((service, index) => {
                    const StatusIcon = getStatusIcon(service.status);
                    return (
                      <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                        <td className={`px-4 py-3 font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {service.name}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${getStatusColor(service.status)}`} />
                            <span className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                              {service.status}
                            </span>
                          </div>
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {service.uptime}
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {service.cpu}%
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {service.memory}MB
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selectedTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Security Settings
            </h3>
            <div className="space-y-4">
              {securitySettings.map((setting, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${
                      setting.enabled ? 'bg-green-100' : 'bg-gray-100'
                    } flex items-center justify-center`}>
                      {setting.enabled ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {setting.name}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleSecurity(setting.name)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              System Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                    <div className="flex-1">
                      <p className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {selectedTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              System Configuration
            </h3>
            <div className="text-center py-12">
              <Settings className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                System configuration panel will be implemented here
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SystemPage;