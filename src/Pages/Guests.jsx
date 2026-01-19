import React from 'react';
import { useBookingStore } from "../store/useBookingStore";
import { User, Calendar, DoorOpen, History, ArrowRight, X } from 'lucide-react';

const Guests = () => {
  const history = useBookingStore((state) => state.history);
  const clearHistory = useBookingStore((state) => state.clearHistory);
  const removeHistory = useBookingStore((state) => state.removeHistory);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-2 md:px-0">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Past Guests</h2>
              <p className="text-xs text-slate-500 font-medium">History of completed stays</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
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
        <div className="md:hidden divide-y divide-slate-200 bg-white">
          {history.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No guest history available yet.
            </div>
          ) : (
            history.map((h) => (
              <div key={h.id} className="px-2 flex flex-col gap-2 mb-1 bg-gray-50 ">
                <div className="flex justify-between items-start bg-slate-150 p-2 rounded-xl">
                  <div className=" items-center gap-3">
                    <div className='flex items-center gap-3'> 
                      <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center font-bold text-sm border border-slate-100">
                        {h.name?.charAt(0)}                    
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{h.name}</p>
                      </div>
                      
                    </div>

                    <div className='flex gap-3 pl-12'>
                      <p className="text-[11px] text-green-500 font-medium">Room {h.roomId}</p>
                      <div className=" rounded-xl flex items-center gap-3 justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                        <div className="flex gap-2 items-center">
                          {h.date}
                        </div>
                        <ArrowRight size={14} className="text-green-500" />
                        <div className="flex flex-col text-right">
                          {h.checkOutDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button  onClick={() => removeHistory(h.id)}
                  className={`text-white bg-rose-600 text-whi hover:bg-rose-700 shadoshadow-rose-200
                    cursor-not-allowed}`}>
                    <X className='' size={13}/>
                  </button>
                </div>
              </div>
            ))
          )}
          
        </div>
      </div>
      <button  onClick={clearHistory}
        disabled={history.length === 0}
        className={`text-white ${history.length > 0 ? "bg-rose-600 text-whi hover:bg-rose-700 shadoshadow-rose-200"
        : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
          <X className='' size={13}/>
        </button>
        <div>
      </div>
    </div>
  );
};

export default Guests;