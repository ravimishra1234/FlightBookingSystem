import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/axios';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const StatCard = ({ label, value, icon, trend, delay }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>
    </div>
    <p className="text-2xl font-black text-primary mb-0.5">{value}</p>
    <p className="text-xs text-gray-400 font-medium">{label}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const chartData = stats?.monthlyBookings?.map(m => ({
    name: MONTHS[m._id.month - 1],
    bookings: m.count,
    revenue: m.revenue,
  })) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Welcome back — here's your overview</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 h-28 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Flights" value={stats?.totalFlights ?? 0} icon="✈" trend="+Active" delay={0} />
            <StatCard label="Total Users" value={stats?.totalUsers ?? 0} icon="👥" trend="+Growing" delay={0.1} />
            <StatCard label="Total Bookings" value={stats?.totalBookings ?? 0} icon="🎫" trend="+Confirmed" delay={0.2} />
            <StatCard label="Total Revenue" value={`₹${((stats?.totalRevenue ?? 0) / 1000).toFixed(0)}K`} icon="💰" trend="+Revenue" delay={0.3} />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-bold text-primary mb-0.5">Booking Trend</h3>
            <p className="text-xs text-gray-400 mb-4">Monthly bookings — last 6 months</p>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D6B43" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1D6B43" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="bookings" stroke="#1D6B43" strokeWidth={2} fill="url(#colorB)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-300 text-sm">No data yet</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-bold text-primary mb-0.5">Revenue</h3>
            <p className="text-xs text-gray-400 mb-4">Monthly revenue (₹)</p>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="revenue" fill="#1D6B43" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-300 text-sm">No data yet</div>
            )}
          </motion.div>
        </div>

        {/* Top routes */}
        {stats?.topRoutes?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-bold text-primary mb-4">Top Routes</h3>
            <div className="space-y-3">
              {stats.topRoutes.map((route, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                  <span className="text-sm text-primary font-medium flex-1">{route._id.source} → {route._id.destination}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(route.count / stats.topRoutes[0].count) * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">{route.count} bookings</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
