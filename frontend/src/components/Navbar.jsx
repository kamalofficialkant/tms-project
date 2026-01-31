import React, { useEffect, useState } from 'react';
import { Search, Bell, Globe, Sun, Moon, Truck } from 'lucide-react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const IconButton = ({ icon: Icon, onClick, badge, hideMobile }) => (
        <button 
            onClick={onClick}
            className={`p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative ${hideMobile ? 'hidden sm:block' : ''}`}
        >
            <Icon size={20} />
            {badge && <span className="absolute top-2 right-2 bg-blue-500 w-2 h-2 rounded-full border-2 border-white dark:border-slate-900" />}
        </button>
    );

    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3 flex justify-between items-center sticky top-0 z-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-md group-hover:scale-105 transition-transform">
                        <Truck className="text-white" size={20} />
                    </div>
                    <h1 className="font-black text-lg tracking-tighter dark:text-white">
                        TM <span className="text-blue-600">System</span>
                    </h1>
                </div>

                <div className="relative group hidden lg:block ml-4">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-blue-500 w-64 dark:text-slate-200"
                    />
                    <Search className="absolute left-3 top-2 text-slate-400" size={14} />
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
                <IconButton icon={isDark ? Sun : Moon} onClick={() => setIsDark(!isDark)} />
                <IconButton icon={Bell} badge />
                <IconButton icon={Globe} hideMobile />

                <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-slate-200 dark:border-slate-800 ml-1">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">John Doe</p>
                        <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">Admin</p>
                    </div>
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;