import React, { useState, useEffect } from 'react';
import { X, Package, MapPin, DollarSign, Truck, Scale } from 'lucide-react';

const ShipmentForm = ({ onSubmit, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        shipperName: '', carrierName: '', pickupLocation: '',
        deliveryLocation: '', rate: '', serviceType: 'FTL', weight: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                shipperName: initialData.shipperName || '',
                carrierName: initialData.carrierName || '',
                pickupLocation: initialData.pickupLocation || '',
                deliveryLocation: initialData.deliveryLocation || '',
                rate: initialData.rate || '',
                serviceType: initialData.serviceType || 'FTL',
                weight: initialData.weight || ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, rate: parseFloat(formData.rate) });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const Input = ({ label, name, icon: Icon, ...props }) => (
        <div className="w-full">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-wider">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
                <input
                    {...props}
                    name={name}
                    onChange={handleChange}
                    className={`w-full ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 dark:text-white transition-all`}
                />
            </div>
        </div>
    );

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
            
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Package size={20} /></div>
                    <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">
                        {!!initialData ? 'Edit Shipment' : 'New Shipment'}
                    </h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-400">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <Input label="Shipper Name" name="shipperName" value={formData.shipperName} icon={Truck} placeholder="Company Name" required />
                <Input label="Carrier Name" name="carrierName" value={formData.carrierName} placeholder="Swift Logistics" required />

                <div className="grid grid-cols-2 gap-3">
                    <Input label="Origin" name="pickupLocation" value={formData.pickupLocation} icon={MapPin} placeholder="City, ST" required />
                    <Input label="Destination" name="deliveryLocation" value={formData.deliveryLocation} placeholder="City, ST" required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="w-full">
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-wider">Service</label>
                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 dark:text-white">
                            <option value="FTL">FTL</option>
                            <option value="LTL">LTL</option>
                            <option value="Expedited">Expedited</option>
                        </select>
                    </div>
                    <Input label="Weight" name="weight" value={formData.weight} icon={Scale} placeholder="Lbs" required />
                </div>

                <Input label="Rate (USD)" name="rate" type="number" value={formData.rate} icon={DollarSign} placeholder="0.00" required />

                <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
                    <button type="button" onClick={onClose} className="flex-1 py-3.5 px-4 text-slate-500 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm uppercase">Cancel</button>
                    <button type="submit" className={`flex-1 py-3.5 px-4 text-white font-bold rounded-xl transition-all active:scale-95 text-sm uppercase shadow-lg ${!!initialData ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}>
                        {!!initialData ? 'Save Changes' : 'Create Shipment'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ShipmentForm;