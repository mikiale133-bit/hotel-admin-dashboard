import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { 
  User, 
  Trash2, AlertTriangle,
  DoorOpen, 
  Calendar, 
  MapPin, 
  MoreHorizontal, 
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';

const Bookings = () => {
  const navigate = useNavigate();
  const bookings = useBookingStore((state) => state.bookings);

  const cancelBooking = useBookingStore((state) => state.cancelBooking);

const handleCancel = (id, roomId, guestName) => {
  if (window.confirm(`Are you sure you want to cancel ${guestName}'s booking?`)) {
    cancelBooking(id, roomId);
  }
};

// Checkout
const checkOut = useBookingStore((state) => state.checkOut);

const handleCheckOut = (id, roomId, guestName) => {
  if (window.confirm(`Check out ${guestName} and free up Room ${roomId}?`)) {
    checkOut(id, roomId);
  }
};

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings Manager</h1>
          <p className="text-slate-500 text-sm">Manage guest check-ins and reservations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search guest..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guest Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <div className="flex flex-col items-center text-slate-400">
                    <Calendar size={48} className="mb-2 opacity-20" />
                    <p>No bookings found. Start by booking a room.</p>
                    <NavLink to={"/rooms"} className="bg-blue-500 mt-5 px-3 py-1 rounded text-white">Back to Rooms</NavLink>
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {booking.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{booking.name}</div>
                        <div className="text-xs text-slate-500">{booking.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <DoorOpen size={16} className="text-slate-400" />
                      Room {booking.roomId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                      <MapPin size={14} className="text-slate-400" />
                      {booking.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      booking.status === 'occupied' 
                        ? 'bg-rose-50 text-rose-700 border-rose-100' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        booking.status === 'occupied' ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}></span>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button 
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                    >
                      View
                    </button>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleCheckOut(booking.id, booking.roomId, booking.name)}
                        className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-100 transition"
                      >
                        <CheckCircle2 size={16} />
                        <span className="text-xs font-bold">Check-out</span>
                      </button>
                      
                      <button 
                        onClick={() => handleCancel(booking.id, booking.roomId)}
                        className="p-2 text-rose-400 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;