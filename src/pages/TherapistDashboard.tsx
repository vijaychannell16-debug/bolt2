import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, Users, MessageSquare, BarChart3, Clock, CheckCircle } from 'lucide-react';

export default function TherapistDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const stats = [
    { label: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'text-blue-600' },
    { label: 'Active Patients', value: '24', icon: Users, color: 'text-green-600' },
    { label: 'Unread Messages', value: '5', icon: MessageSquare, color: 'text-orange-600' },
    { label: 'This Week\'s Sessions', value: '32', icon: BarChart3, color: 'text-purple-600' },
  ];

  const upcomingAppointments = [
    { time: '9:00 AM', patient: 'Sarah Johnson', type: 'CBT Session' },
    { time: '10:30 AM', patient: 'Michael Chen', type: 'Initial Consultation' },
    { time: '2:00 PM', patient: 'Emma Davis', type: 'Follow-up' },
    { time: '3:30 PM', patient: 'James Wilson', type: 'Group Therapy' },
  ];

  const recentActivity = [
    { action: 'Completed session with Sarah Johnson', time: '1 hour ago', status: 'completed' },
    { action: 'New patient registration: Alex Thompson', time: '2 hours ago', status: 'new' },
    { action: 'Updated treatment plan for Emma Davis', time: '3 hours ago', status: 'updated' },
    { action: 'Sent progress report to Michael Chen', time: '5 hours ago', status: 'sent' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, Dr. {user?.name || 'Therapist'}
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Here's what's happening with your practice today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-lg border shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className={`${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-lg border shadow-sm`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Today's Appointments
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {appointment.patient}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {appointment.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-lg border shadow-sm`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                      activity.status === 'new' ? 'bg-blue-100 text-blue-600' :
                      activity.status === 'updated' ? 'bg-orange-100 text-orange-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <CheckCircle className="h-4 w-4" />
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