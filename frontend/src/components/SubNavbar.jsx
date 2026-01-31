import React, { useState } from 'react';
import { 
    ChevronDown, LayoutDashboard, Package, 
    Truck, Wallet, BarChart3, Settings, Menu, X 
} from 'lucide-react';

const SubNavbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSelection, setActiveSelection] = useState('Dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18}/> },
        { 
            name: 'Operations', 
            icon: <Package size={18}/>, 
            sub: ['Active Loads', 'Completed', 'Inventory'] 
        },
        { 
            name: 'Fleet', 
            icon: <Truck size={18}/>, 
            sub: ['Trucks', 'Drivers', 'Maintenance'] 
        },
        { 
            name: 'Finance', 
            icon: <Wallet size={18}/>, 
            sub: ['Invoices', 'Payouts', 'Tax Reports'] 
        },
        { name: 'Analytics', icon: <BarChart3 size={18}/> },
        { name: 'Settings', icon: <Settings size={18}/> },
    ];

    const handleToggle = (name) => {
        setActiveMenu(activeMenu === name ? null : name);
        setActiveSelection(name);
    };

    return (
        <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[61px] z-40 transition-colors">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-14 md:h-16">
                
                {/* Mobile: Hamburger Button */}
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                >
                    <Menu size={24} />
                </button>

                {/* Desktop: Horizontal Menu */}
                <div className="hidden md:flex items-center gap-1 h-full">
                    {menuItems.map((item) => {
                    const isOpen = activeMenu === item.name;
                    const isSelected = activeSelection === item.name;

                    return (
                        <div key={item.name} className="relative h-full flex items-center">
                        <button 
                            onClick={() => handleToggle(item.name)}
                            className={`
                            flex items-center gap-2 px-4 h-full transition-all border-b-2
                            ${isSelected 
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold' 
                                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'}
                            `}
                        >
                            {item.icon}
                            <span className="text-sm uppercase tracking-tight">{item.name}</span>
                            {item.sub && <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
                        </button>

                        {/* Desktop Dropdown */}
                        {item.sub && isOpen && (
                            <div className="absolute top-[100%] left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-xl shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2">
                            {item.sub.map((subItem) => (
                                <button
                                key={subItem}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                                >
                                {subItem}
                                </button>
                            ))}
                            </div>
                        )}
                        </div>
                    );
                    })}
                </div>

                {/* Right Side placeholder (can be notifications/user) */}
                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {activeSelection}
                </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    
                    <div className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="font-black text-blue-600 uppercase tracking-tighter">Navigation</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-slate-400" /></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.name} className="space-y-1">
                                    <button 
                                        onClick={() => handleToggle(item.name)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                                        activeSelection === item.name ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="font-bold text-sm">{item.name}</span>
                                        </div>
                                        {item.sub && <ChevronDown size={16} className={activeMenu === item.name ? 'rotate-180' : ''} />}
                                    </button>
                                    
                                    {item.sub && activeMenu === item.name && (
                                        <div className="ml-10 space-y-1 animate-in slide-in-from-top-2">
                                            {item.sub.map(sub => (
                                                <button key={sub} className="w-full text-left p-2 text-xs font-medium text-slate-500 hover:text-blue-600">{sub}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default SubNavbar;