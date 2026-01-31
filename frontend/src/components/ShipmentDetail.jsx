import React from 'react';
import { ArrowLeft, MapPin, Truck, ShieldCheck } from 'lucide-react';

const ShipmentDetail = ({ ship, onClose }) => {
    if (!ship) return null;

    const DetailCard = ({ label, value, icon: Icon, iconColor }) => (
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">{label}</h4>
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200 text-sm md:text-base">
                <Icon className={iconColor} size={18} />
                {value}
            </div>
        </div>
    );

    const InfoRow = ({ label, value, icon: Icon }) => (
        <div className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
            <Icon className="text-slate-400" size={20} /> 
            <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white mr-1">{label}:</span> {value}
            </p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-end z-[60]">
            <div className="w-full sm:max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl p-6 md:p-10 overflow-y-auto animate-in slide-in-from-right duration-300 border-l dark:border-slate-800">
                
                <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors mb-8 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span className="font-bold text-sm">Back to shipments</span>
                </button>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase leading-tight">{ship.shipperName}</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">ID: {ship.id} • Tracking: {ship.trackingNo}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">${ship.rate}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        ship.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                        }`}>
                        {ship.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    <DetailCard label="Origin" value={ship.pickupLocation} icon={MapPin} iconColor="text-blue-500" />
                    <DetailCard label="Destination" value={ship.deliveryLocation} icon={MapPin} iconColor="text-red-500" />
                </div>

                <div className="space-y-3">
                    <InfoRow label="Carrier" value={ship.carrierName} icon={Truck} />
                    <InfoRow label="Service" value={ship.serviceType} icon={ShieldCheck} />
                    <InfoRow label="Weight" value={ship.weight || 'N/A'} icon={ShieldCheck} />
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetail;