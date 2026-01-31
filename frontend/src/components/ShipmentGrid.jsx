import React from 'react';
import { ChevronDown, Edit3 } from 'lucide-react';

const ShipmentGrid = ({ data, onUpdateStatus, onEditClick }) => {
    const headers = ["ID", "Shipper", "Carrier", "Route", "Status", "Rate", "Actions"];
    const statusOptions = ['Pending', 'In Transit', 'Delivered', 'Delayed'];
  
    const getStatusStyle = (s) => {
        const status = s?.toLowerCase();
        if (status === 'delivered') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        if (status === 'in transit') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        if (status === 'delayed') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    };

    const Td = ({ children, className = "" }) => (
        <td className={`p-4 text-sm whitespace-nowrap ${className}`}>{children}</td>
    );

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                        {headers.map(h => (
                            <th key={h} className="p-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{h}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.map((ship) => (
                            <tr key={ship.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                <Td className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">#{ship.id}</Td>
                                <Td className="font-bold text-slate-900 dark:text-white">{ship.shipperName}</Td>
                                <Td className="text-slate-500">{ship.carrierName}</Td>
                                <Td className="text-slate-500">
                                    <div className="flex flex-col text-[11px] leading-tight font-medium uppercase tracking-tight">
                                        <span className="text-slate-400">From: {ship.pickupLocation}</span>
                                        <span className="text-slate-900 dark:text-slate-200">To: {ship.deliveryLocation}</span>
                                    </div>
                                </Td>
                                <Td>
                                    <div className="relative inline-block">
                                        <select
                                        value={ship.status}
                                        onChange={(e) => onUpdateStatus(ship.id, e.target.value)}
                                        className={`appearance-none pl-3 pr-8 py-1 rounded-full text-[10px] font-black uppercase border-none focus:ring-0 ${getStatusStyle(ship.status)}`}
                                        >
                                        {statusOptions.map(opt => <option key={opt} value={opt} className="bg-white dark:bg-slate-900">{opt}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                    </div>
                                </Td>
                                <Td className="font-black text-slate-900 dark:text-white">${ship.rate?.toLocaleString()}</Td>
                                <Td>
                                    <button onClick={() => onEditClick(ship)} className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                        <Edit3 size={16} />
                                    </button>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShipmentGrid;