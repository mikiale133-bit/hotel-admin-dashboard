import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '../store/useBookingStore';

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const addBooking = useBookingStore((state) => state.addBooking);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Add the room ID to the guest data
    addBooking({
      ...data,
      roomId: roomId,
      date: new Date().toLocaleDateString()
    });
    
    // Move to the bookings list where the new data will now appear
    navigate('/bookings');
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Book Room {roomId}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Guest Full Name</label>
              <input {...register("name")} className="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input {...register("phone")} className="mt-1 block w-full border rounded-md p-2" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" {...register("email")} className="mt-1 block w-full border rounded-md p-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kebelle / City</label>
              <input {...register("location")} className="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Status</label>
              <select {...register("status")} className="mt-1 block w-full border rounded-md p-2 bg-white">
                <option value="booked">Booked (Reservation)</option>
                <option value="occupied">Occupied (Check-in Now)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;