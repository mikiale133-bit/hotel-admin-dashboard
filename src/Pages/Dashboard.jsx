import React from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { Users, Bed, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { bookings, rooms } = useBookingStore();

  const stats = [
    { 
      label: "Total Bookings", 
      value: bookings.length, 
      icon: <Users className="text-blue-600" />, 
      bg: "bg-blue-50" 
    },
    { 
      label: "Available Rooms", 
      value: rooms.filter(r => r.status === 'available').length, 
      icon: <CheckCircle className="text-emerald-600" />, 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Occupied/Booked", 
      value: rooms.filter(r => r.status !== 'available').length, 
      icon: <Bed className="text-amber-600" />, 
      bg: "bg-amber-50" 
    },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          {bookings.length === 0 ? (
            <p className="text-slate-400 text-sm italic">No recent bookings recorded.</p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(-3).reverse().map((b) => (
                <div key={b.id} className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <div>
                    <p className="font-medium text-slate-800">{b.name}</p>
                    <p className="text-xs text-slate-500">Room {b.roomId} • {b.status}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{b.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;