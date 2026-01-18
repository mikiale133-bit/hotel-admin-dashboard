import React from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { Users, Bed, CheckCircle, Clock, Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { bookings, rooms } = useBookingStore();

  const stats = [
    { 
      label: "Total Bookings", 
      value: bookings.length, 
      icon: <Users size={22} />, 
      color: "blue" 
    },
    { 
      label: "Available Rooms", 
      value: rooms.filter(r => r.status === 'available').length, 
      icon: <CheckCircle size={22} />, 
      color: "emerald" 
    },
    { 
      label: "Occupied", 
      value: rooms.filter(r => r.status !== 'available').length, 
      icon: <Bed size={22} />, 
      color: "amber" 
    },
  ];

  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-slate-50/50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Real-time property status and activity.</p>
        </div>
        <div className="inline-flex items-center self-start sm:self-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-xs md:text-sm font-medium text-slate-600">
          <Calendar size={14} />
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
      
      {/* Stats Grid - Adjusts from 1 to 3 columns based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between sm:items-start">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl md:text-4xl font-bold text-slate-900 mt-1 md:mt-2 tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-xl border ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Recent Activity
            </h3>
            <button className="text-xs md:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="p-5 md:p-6">
            {bookings.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-50 p-3 rounded-full mb-3">
                  <Clock size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-400 text-sm italic">No recent bookings recorded.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.slice(-3).reverse().map((b) => (
                  <div key={b.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {b.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm md:text-base leading-tight">{b.name}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Room {b.roomId}</span>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-tight">{b.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="sm:text-right pl-12 sm:pl-0">
                      <p className="text-[11px] font-medium text-slate-400 tabular-nums">{b.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info/Action Card (Visible only on larger screens or as a footer element on mobile) */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="font-bold text-lg mb-2">Quick Tip</h4>
            <p className="text-blue-100 text-sm leading-snug">
              Occupancy is up by 12% this week. Consider updating your weekend availability.
            </p>
          </div>
          <button className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;