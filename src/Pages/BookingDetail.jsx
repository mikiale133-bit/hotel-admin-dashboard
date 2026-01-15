import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Save, X, User, MapPin, Phone, Mail, DoorOpen } from 'lucide-react';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock initial data (In reality, fetch this from your store using the 'id')
  const [booking, setBooking] = useState({
    id: id,
    guestName: "Abebe Balcha",
    phone: "+251 911 22 33 44",
    email: "abebe@example.com",
    location: "Addis Ababa, Kebelle 03",
    roomName: "101",
    status: "occupied",
    checkIn: "2026-01-15"
  });

  const handleSave = () => {
    // Logic: Update your global state or database here
    setIsEditing(false);
    console.log("Updated Booking:", booking);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header Navigation */}
      <button 
        onClick={() => navigate('/bookings')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Back to Bookings
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
          <div>
            <h1 className="text-2xl font-bold">{isEditing ? "Editing Booking" : "Booking Details"}</h1>
            <p className="opacity-80">ID: {id}</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isEditing ? "bg-green-500 hover:bg-green-600" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isEditing ? <><Save size={18}/> Save Changes</> : <><Edit3 size={18}/> Edit Booking</>}
          </button>
        </div>

        {/* Details Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Guest Information Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User size={16} /> Guest Information
            </h3>
            
            <DetailItem 
              label="Full Name" 
              value={booking.guestName} 
              isEditing={isEditing}
              onChange={(val) => setBooking({...booking, guestName: val})}
            />
            
            <DetailItem 
              label="Phone Number" 
              value={booking.phone} 
              isEditing={isEditing}
              onChange={(val) => setBooking({...booking, phone: val})}
            />

            <DetailItem 
              label="Kebelle / City" 
              value={booking.location} 
              isEditing={isEditing}
              onChange={(val) => setBooking({...booking, location: val})}
            />
          </div>

          {/* Stay Details Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <DoorOpen size={16} /> Room & Status
            </h3>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Current Status</label>
              {isEditing ? (
                <select 
                  value={booking.status}
                  onChange={(e) => setBooking({...booking, status: e.target.value})}
                  className="w-full border rounded-lg p-2 bg-gray-50"
                >
                  <option value="booked">Booked</option>
                  <option value="occupied">Occupied</option>
                </select>
              ) : (
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  booking.status === 'occupied' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {booking.status}
                </span>
              )}
            </div>

            <DetailItem 
              label="Assigned Room" 
              value={booking.roomName} 
              isEditing={false} // Room usually shouldn't be changed here
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for clean layout
const DetailItem = ({ label, value, isEditing, onChange }) => (
  <div>
    <label className="text-xs text-gray-500 block mb-1">{label}</label>
    {isEditing ? (
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-indigo-300 focus:border-indigo-600 outline-none py-1 bg-indigo-50/30 px-2 rounded-t"
      />
    ) : (
      <p className="text-gray-800 font-medium">{value || "Not provided"}</p>
    )}
  </div>
);

export default BookingDetail;