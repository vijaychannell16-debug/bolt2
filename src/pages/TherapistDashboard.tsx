import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, MessageSquare, BarChart3, Clock, 
  CheckCircle, Video, Phone, Eye, Edit, Plus,
  TrendingUp, DollarSign, Star, Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

function TherapistDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const stats = [
    { 
      label: 'Today\'s Appointments', 
      value: '8', 
      icon: Calendar, 
      color: 'from-blue-500 to-cyan-500',
      change: '+2 from yesterday'
    },
    { 
      label: 'Active Patients', 
      value: '24', 
      icon: Users, 
      color: 'from-green-500 to-teal-500',
      change: '+3 this month'
    },
    { 
      label: 'This Month\'s Revenue', 
      value: '$8,040', 
      icon: DollarSign, 
      color: 'from-purple-500 to-pink-500',
      change: '+18% from last month'
    },
    { 
      label: 'Average Rating', 
      value: '4.9', 
      icon: Star, 
      color: 'from-orange-500 to-red-500',
      change: 'Based on 127 reviews'
    },
  ];

  const upcomingAppointments = [
    { 
      id: '1',
      time: '9:00 AM', 
      patient: 'Sarah Johnson', 
      type: 'CBT Session',
      status: 'confirmed',
      sessionType: 'video'
    },
    { 
      id: '2',
      time: '10:30 AM', 
      patient: 'Michael Chen', 
      type: 'Initial Consultation',
      status: 'pending',
      sessionType: 'video'
    },
    { 
      id: '3',
      time: '2:00 PM', 
      patient: 'Emma Davis', 
      type: 'Follow-up',
      status: 'confirmed',
      sessionType: 'phone'
    },
    { 
      id: '4',
      time: '3:30 PM', 
      patient: 'James Wilson', 
      type: 'Group Therapy',
      status: 'confirmed',
      sessionType: 'video'
    },
  ];

  const recentActivity = [
    { 
      action: 'Completed session with Sarah Johnson', 
      time: '1 hour ago', 
      status: 'completed',
      icon: CheckCircle
    },
    { 
      action: 'New patient registration: Alex Thompson', 
      time: '2 hours ago', 
      status: 'new',
      icon: Users
    },
    { 
      action: 'Updated treatment plan for Emma Davis', 
      time: '3 hours ago', 
      status: 'updated',
      icon: Edit
    },
    { 
      action: 'Sent progress report to Michael Chen', 
      time: '5 hours ago', 
      status: 'sent',
      icon: MessageSquare
    },
  ];

  const joinVideoSession = (appointmentId: string) => {
    window.open(`/video-session/${appointmentId}`, '_blank');
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
            Welcome back, {user?.name}
          </h1>
          <p className={`text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Here's what's happening with your practice today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => (
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
                    {stat.label}
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
              <p className={`text-sm mt-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-4 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Today's Appointments
              </h2>
              <Link
                to="/appointments"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 dark:bg-green-900/50' 
                          : 'bg-yellow-100 dark:bg-yellow-900/50'
                      }`}>
                        {appointment.sessionType === 'video' ? (
                          <Video className={`w-5 h-5 ${
                            appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        ) : (
                          <Phone className={`w-5 h-5 ${
                            appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {appointment.patient}
                        </p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {appointment.type} • {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      }`}>
                        {appointment.status}
                      </span>
                      {appointment.status === 'confirmed' && appointment.sessionType === 'video' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => joinVideoSession(appointment.id)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                        >
                          Join
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-4 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900/50' :
                    activity.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/50' :
                    activity.status === 'updated' ? 'bg-orange-100 dark:bg-orange-900/50' :
                    'bg-purple-100 dark:bg-purple-900/50'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      activity.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      activity.status === 'new' ? 'text-blue-600 dark:text-blue-400' :
                      activity.status === 'updated' ? 'text-orange-600 dark:text-orange-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`p-4 rounded-xl shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'View Appointments', icon: Calendar, link: '/appointments', color: 'from-blue-500 to-cyan-500' },
              { label: 'Manage Patients', icon: Users, link: '/patients', color: 'from-green-500 to-teal-500' },
              { label: 'Check Messages', icon: MessageSquare, link: '/messages', color: 'from-purple-500 to-pink-500' },
              { label: 'View Reports', icon: BarChart3, link: '/reports', color: 'from-orange-500 to-red-500' }
            ].map((action, index) => (
              <Link key={index} to={action.link}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {action.label}
                  </h4>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const joinVideoSession = (appointmentId: string) => {
  // Open video session in new tab/window
  window.open(`/video-session/${appointmentId}`, '_blank');
};

export default TherapistDashboard;
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activity.action}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}