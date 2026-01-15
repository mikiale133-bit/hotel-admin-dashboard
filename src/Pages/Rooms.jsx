import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore'; // Import the store
import { Bed, CheckCircle, XCircle, Clock } from 'lucide-react';

const Rooms = () => {
  const navigate = useNavigate();
  
  // Pull rooms directly from the Global Store
  const rooms = useBookingStore((state) => state.rooms);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Room Availability</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className={`bg-white rounded-xl p-6 border transition-all ${
            room.status === 'available' ? 'border-emerald-100 shadow-sm' : 'border-slate-200 opacity-80'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                room.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
              }`}>
                <Bed size={24} />
              </div>
              
              {/* Dynamic Status Badge */}
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                room.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                room.status === 'occupied' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {room.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800">{room.name}</h3>
            <p className="text-slate-500 text-sm mb-6">${room.price} / night</p>

            {/* Responsive Button */}
            <button
              onClick={() => navigate(`/book/${room.id}`)}
              disabled={room.status !== 'available'}
              className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
                room.status === 'available'
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {room.status === 'available' ? "Book Room" : `Room ${room.status}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;