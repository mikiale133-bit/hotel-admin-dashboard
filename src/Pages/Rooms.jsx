import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { Bed, CheckCircle, XCircle, Clock, Wifi, Coffee, ChevronRight } from 'lucide-react';

const Rooms = () => {
  const navigate = useNavigate();
  const rooms = useBookingStore((state) => state.rooms);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'occupied':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Room Availability</h1>
        <p className="text-slate-500 mt-2 font-medium">Find and book your perfect stay.</p>
      </div>

      <div className="max-w-7xl mx-auto grid max-sm:grid-cols-1 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {rooms.map((room) => {
          const isAvailable = room.status === 'available';
          
          return (
            <div 
              key={room.id} 
              className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 overflow-hidden ${
                isAvailable 
                ? 'border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200' 
                : 'border-slate-100 bg-slate-50/50 opacity-90'
              }`}
            >
              {/* Status Header */}
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl transition-colors ${
                  isAvailable ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-500'
                }`}>
                  <Bed size={24} />
                </div>
                
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${getStatusStyles(room.status)}`}>
                  {room.status}
                </span>
              </div>

              {/* Room Details */}
              <div className="mb-8">
                <h3 className={`text-xl font-bold transition-colors ${isAvailable ? 'text-slate-900 group-hover:text-indigo-600' : 'text-slate-500'}`}>
                  {room.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`text-2xl font-black ${isAvailable ? 'text-slate-900' : 'text-slate-400'}`}>
                    ${room.price}
                  </span>
                  <span className="text-sm font-medium text-slate-400">/ night</span>
                </div>
              </div>

              {/* Icon Bar (Visual Polish) */}
              <div className="flex gap-4 mb-8 text-slate-300">
                <Wifi size={18} className={isAvailable ? 'text-slate-400' : 'text-slate-200'} />
                <Coffee size={18} className={isAvailable ? 'text-slate-400' : 'text-slate-200'} />
                <Clock size={18} className={isAvailable ? 'text-slate-400' : 'text-slate-200'} />
              </div>

              {/* Booking Button */}
              <button
                onClick={() => navigate(`/book/${room.id}`)}
                disabled={!isAvailable}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isAvailable
                    ? "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-100"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isAvailable ? (
                  <>
                    Book Now <ChevronRight size={18} />
                  </>
                ) : (
                  `Not Available`
                )}
              </button>

              {/* Subtle background decoration for available rooms */}
              {isAvailable && (
                <div className="absolute right-4 bottom-4 w-24 h-24 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;