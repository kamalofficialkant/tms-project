import React from 'react';
import { Edit3, DollarSign, Package, Scale, Truck } from 'lucide-react';

const ShipmentTile = ({ ship, onClick, onEditClick, onUpdateStatus }) => {
    const getStatusColor = (s) => {
        if (s === 'Delivered') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    };

    const Badge = ({ icon: Icon, text }) => (
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <Icon size={13} />
            {text}
        </div>
    );

    return (
        <div 
            onClick={() => onClick(ship)}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500/50 transition-all cursor-pointer relative flex flex-col h-full min-h-[200px]"
        >
            <button 
                onClick={(e) => { e.stopPropagation(); onEditClick(ship); }}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 transition-colors shadow-sm"
            >
            <Edit3 size={15} />
            </button>

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <Package size={14} />
                    </div>
                    <span className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest">#{ship.id}</span>
                </div>

                <h3 className="font-black text-slate-800 dark:text-white text-lg leading-tight mb-2 line-clamp-1 pr-10 uppercase tracking-tight">{ship.shipperName}</h3>
                
                <div className="flex flex-wrap gap-4">
                    <Badge icon={Truck} text={ship.serviceType || 'FTL'} />
                    <Badge icon={Scale} text={ship.weight || '0 lbs'} />
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                <div className="flex items-center font-black text-slate-900 dark:text-white text-xl tracking-tight">
                    <DollarSign size={16} className="text-green-500" />
                    {ship.rate?.toLocaleString()}
                </div>
                
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <select
                        value={ship.status}
                        onChange={(e) => onUpdateStatus(ship.id, e.target.value)}
                        className={`appearance-none px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border-none focus:ring-0 ${getStatusColor(ship.status)} transition-colors`}
                    >
                        {['Pending', 'In Transit', 'Delivered', 'Delayed'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ShipmentTile;