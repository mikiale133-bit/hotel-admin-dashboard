import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { 
  Trash2, 
  DoorOpen, 
  MapPin, 
  Search,
  Filter,
  CheckCircle2,
  Phone,
  ChevronRight,
  Inbox
} from 'lucide-react';

const Bookings = () => {
  const navigate = useNavigate();
  const bookings = useBookingStore((state) => state.bookings);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);
  const checkOut = useBookingStore((state) => state.checkOut);

  // --- Logic preserved exactly as original ---
  const handleCancel = (id, roomId, guestName) => {
    if (window.confirm(`Are you sure you want to cancel ${guestName}'s booking?`)) {
      cancelBooking(id, roomId);
    }
  };

  const handleCheckOut = (id, roomId, guestName) => {
    if (window.confirm(`Check out ${guestName} and free up Room ${roomId}?`)) {
      checkOut(id, roomId);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Bookings Manager</h1>
          <p className="text-slate-500 text-sm">Manage guest check-ins and reservations</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search guest..." 
              className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
              <Inbox size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-600 font-bold text-lg">No bookings found</p>
            <p className="text-slate-400 text-sm mb-6">Start by booking a room for a guest.</p>
            <NavLink to="/rooms" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100">
              Go to Rooms
            </NavLink>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW (Hidden on Mobile) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Guest Details</th>
                    <th className="px-6 py-4">Room</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase">
                            {booking.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{booking.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{booking.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <div className="flex items-center gap-2">
                          <DoorOpen size={16} className="text-slate-300" />
                          Room {booking.roomId}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-300" />
                          {booking.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          booking.status === 'occupied' 
                            ? 'bg-rose-50 text-rose-700 border-rose-100' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-2">
                          <button 
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                            className="px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-xs transition-colors"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleCheckOut(booking.id, booking.roomId, booking.name)}
                            className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition-all font-bold text-xs"
                          >
                            <CheckCircle2 size={14} /> Check-out
                          </button>
                          <button 
                            onClick={() => handleCancel(booking.id, booking.roomId, booking.name)}
                            className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW (Visible on Mobile/Tablet) */}
            <div className="lg:hidden space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                        {booking.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{booking.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Phone size={10} /> {booking.phone}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase border ${
                      booking.status === 'occupied' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 my-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Room</p>
                      <p className="text-sm font-bold text-slate-700">#{booking.roomId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{booking.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCheckOut(booking.id, booking.roomId, booking.name)}
                      className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
                    >
                      <CheckCircle2 size={16} /> Check-out
                    </button>
                    <button 
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="p-2.5 bg-slate-100 text-slate-600 rounded-xl"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button 
                      onClick={() => handleCancel(booking.id, booking.roomId, booking.name)}
                      className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;