import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useBookingStore = create(
  persist(
    (set) => ({
      rooms: [
        { id: '101', name: "Room 101", status: "available", price: 100 },   
        { id: '102', name: "Room 102", status: "available", price: 120 }, 
        { id: '103', name: "Room 103", status: "available", price: 150 },  
        { id: '104', name: "Room 104", status: "available", price: 160 },  
        { id: '105', name: "Room 105", status: "available", price: 170 },  
        { id: '106', name: "Room 106", status: "available", price: 170 },  
        { id: '107', name: "Room 107", status: "available", price: 170 },  
      ],  
      bookings: [],
      history: [], // New array for completed stays
      clearHistory: () => set({ history: [] }), // ✅ NEW
      removeHistory: (historyId) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== historyId),
        })),

      checkOut: (bookingId, roomId) => set((state) => {
        const bookingToFinish = state.bookings.find(b => b.id === bookingId);
        
        return {
          // 1. Remove from active bookings
          bookings: state.bookings.filter(b => b.id !== bookingId),
          // 2. Add to history with a checkout timestamp
          history: [...state.history, { ...bookingToFinish, checkOutDate: new Date().toLocaleDateString() }],
          // 3. Make room available again
          rooms: state.rooms.map(room => 
            room.id === roomId ? { ...room, status: 'available' } : room
          )
        };
      }),
      
      addBooking: (newBooking) => set((state) => ({
        bookings: [...state.bookings, { ...newBooking, id: `BK-${Date.now()}` }],
        rooms: state.rooms.map(room => 
          room.id === newBooking.roomId ? { ...room, status: newBooking.status } : room
        )
      })),

      updateBooking: (id, updatedData) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, ...updatedData } : b)
      })),

      
      cancelBooking: (bookingId, roomId) => set((state) => ({
        // 1. Remove the booking from the list
        bookings: state.bookings.filter(b => b.id !== bookingId),
        
        // 2. Set the room back to 'available'
        rooms: state.rooms.map(room => 
          room.id === roomId ? { ...room, status: 'available' } : room
        )
      })),
    }),
    {
      name: 'hotel-storage', // unique name for the item in storage
      storage: createJSONStorage(() => localStorage), 
    }
  )
);