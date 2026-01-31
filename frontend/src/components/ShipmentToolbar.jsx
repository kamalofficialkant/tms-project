import React from 'react';
import { Search, ArrowUpDown, Plus } from 'lucide-react';

const ShipmentToolbar = ({ onSearch, onFilterStatus, onSort, onAddClick, currentStatus }) => {
    const statuses = ['All', 'In Transit', 'Delivered', 'Pending', 'Delayed'];

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex flex-col md:flex-row flex-1 gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search shipments..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200 shadow-sm transition-all"
                    />
                </div>

                <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar shadow-sm">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => onFilterStatus(status)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight whitespace-nowrap transition-all ${
                                currentStatus === status 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center flex-1 md:flex-none bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <ArrowUpDown size={16} className="text-slate-400 mr-2" />
                    <select 
                        onChange={(e) => onSort(e.target.value)}
                        className="bg-transparent border-none text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer w-full"
                        style={{ colorScheme: 'dark' }}
                    >
                        <option value="default" className="dark:bg-slate-900">Sort By</option>
                        <option value="shipper" className="dark:bg-slate-900">Shipper</option>
                        <option value="rate" className="dark:bg-slate-900">Rate</option>
                    </select>
                </div>

                <button 
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl text-sm font-black uppercase tracking-tighter shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                    <Plus size={20} />
                    <span className="hidden md:inline">New Shipment</span>
                </button>
            </div>
        </div>
    );
};

export default ShipmentToolbar;