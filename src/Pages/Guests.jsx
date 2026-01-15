import { useBookingStore } from "../store/useBookingStore";
const Guests = () => {
  const history = useBookingStore((state) => state.history);

  return (
    <div className="bg-white rounded-2xl border border-gray-200  mt-8 mx-2">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold">Past Guests (History)</h2>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Guest</th>
            <th className="px-6 py-3">Room</th>
            <th className="px-6 py-3">Stay Dates</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {history.map((h) => (
            <tr key={h.id} className="text-sm">
              <td className="px-6 py-4 font-medium">{h.name}</td>
              <td className="px-6 py-4">Room {h.roomId}</td>
              <td className="px-6 py-4 text-slate-500">{h.date} - {h.checkOutDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Guests