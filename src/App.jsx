import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Dashboard from './Pages/Dashboard'
import Rooms from './Pages/Rooms'
import Bookings from './Pages/bookings'
import Settings from './Pages/settings'
import Guests from './Pages/Guests'
import BookingForm from './Pages/BookingForm'
import BookingDetail from './Pages/BookingDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path="book/:roomId" element={<BookingForm />} />
          <Route path="bookings/:id" element={<BookingDetail />} />
          <Route path='bookings' element={<Bookings />} />
          <Route path='settings' element={<Settings />} />
          <Route path='guests' element={<Guests />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App