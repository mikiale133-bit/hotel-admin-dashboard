import React from 'react';
import { useBookingStore } from "../store/useBookingStore";
import { User, Calendar, DoorOpen, History, ArrowRight } from 'lucide-react';

const Guests = () => {
  const history = useBookingStore((state) => state.history);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-2 md:px-0">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Past Guests</h2>
              <p className="text-xs text-slate-500 font-medium">History of completed stays</p>
            </div>
          </div>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
            {history.length} Records
          </span>
        </div>

        {/* Desktop View: Clean Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Guest Information</th>
                <th className="px-8 py-4">Room Detail</th>
                <th className="px-8 py-4">Duration of Stay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center text-slate-400 italic">
                    No guest history available yet.
                  </td>
                </tr>
              ) : (
                history.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold border border-slate-200">
                          {h.name?.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-700">{h.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <DoorOpen size={16} className="text-slate-300" />
                        <span className="font-medium">Room {h.roomId}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                        <Calendar size={14} className="text-slate-300" />
                        <span>{h.date}</span>
                        <ArrowRight size={12} className="text-slate-300" />
                        <span>{h.checkOutDate}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Timeline Cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {history.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No guest history available yet.
            </div>
          ) : (
            history.map((h) => (
              <div key={h.id} className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-100">
                      {h.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-tight">{h.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">Room {h.roomId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 mb-1">Check In</span>
                    {h.date}
                  </div>
                  <ArrowRight size={14} className="text-slate-300" />
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-400 mb-1">Check Out</span>
                    {h.checkOutDate}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Guests;