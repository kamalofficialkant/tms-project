import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import SubNavbar from './components/SubNavbar';
import Navbar from './components/Navbar';
import ShipmentToolbar from './components/ShipmentToolbar';
import ShipmentGrid from './components/ShipmentGrid';
import ShipmentTile from './components/ShipmentTile';
import ShipmentDetail from './components/ShipmentDetail';
import ShipmentForm from './components/ShipmentForm';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const GET_SHIPMENTS = gql`query GetShipments {shipments { id shipperName carrierName pickupLocation deliveryLocation status trackingNo rate serviceType weight }}`;
const ADD_SHIPMENT = gql`mutation AddShipment($shipperName: String!, $carrierName: String!, $pickupLocation: String!, $deliveryLocation: String!, $rate: Float!, $serviceType: String, $weight: String) { addShipment(shipperName: $shipperName, carrierName: $carrierName, pickupLocation: $pickupLocation, deliveryLocation: $deliveryLocation, rate: $rate, serviceType: $serviceType, weight: $weight) { id shipperName status }}`;
const UPDATE_STATUS = gql`mutation UpdateStatus($id: ID!, $status: String!) { updateShipmentStatus(id: $id, status: $status) { id status }}`;
const UPDATE_SHIPMENT = gql`mutation UpdateShipment($id: ID!, $shipperName: String, $carrierName: String, $pickupLocation: String, $deliveryLocation: String, $rate: Float, $serviceType: String, $weight: String) { updateShipment(id: $id, shipperName: $shipperName, carrierName: $carrierName, pickupLocation: $pickupLocation, deliveryLocation: $deliveryLocation, rate: $rate, serviceType: $serviceType, weight: $weight) { id shipperName }}`;

function App() {
    const [view, setView] = useState('grid');
    const [selectedShip, setSelectedShip] = useState(null);
    const [editingShipment, setEditingShipment] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { loading, error, data } = useQuery(GET_SHIPMENTS);
    const [addShipment] = useMutation(ADD_SHIPMENT, { refetchQueries: [{ query: GET_SHIPMENTS }], onCompleted: () => setIsAddModalOpen(false) });
    const [updateStatus] = useMutation(UPDATE_STATUS);
    const [updateShipment] = useMutation(UPDATE_SHIPMENT, { refetchQueries: [{ query: GET_SHIPMENTS }], onCompleted: () => setEditingShipment(null) });

    useEffect(() => { setCurrentPage(1); }, [searchTerm, statusFilter]);

    const allFilteredShipments = useMemo(() => {
        if (!data?.shipments) return [];
        let filtered = data.shipments.filter(ship => {
            const s = searchTerm.toLowerCase();
            return (ship.shipperName.toLowerCase().includes(s) || ship.id.toLowerCase().includes(s) || (ship.trackingNo?.toLowerCase().includes(s))) && (statusFilter === 'All' || ship.status === statusFilter);
        });
        if (sortConfig === 'shipper') filtered = [...filtered].sort((a, b) => a.shipperName.localeCompare(b.shipperName));
        if (sortConfig === 'rate') filtered = [...filtered].sort((a, b) => b.rate - a.rate);
        return filtered;
    }, [data, searchTerm, statusFilter, sortConfig]);

    const totalPages = Math.ceil(allFilteredShipments.length / itemsPerPage);
    const paginatedShipments = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return allFilteredShipments.slice(start, start + itemsPerPage);
    }, [allFilteredShipments, currentPage]);

    if (loading) return <div className="h-screen flex items-center justify-center dark:bg-slate-950 dark:text-white font-bold animate-pulse text-lg">Loading...</div>;
    if (error) return <div className="p-10 text-red-500 bg-slate-50 dark:bg-slate-950 h-screen font-bold">Error: {error.message}</div>;

    const NavBtn = ({ active, onClick, icon: Icon }) => (
        <button onClick={onClick} className={`px-4 py-2 rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Icon size={18} />
        </button>
    );

    return (
        <div className="flex flex-col bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
            <Navbar />
            <SubNavbar />

            <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Shipments</h2>
                        <p className="text-slate-500 text-sm font-medium">Showing {paginatedShipments.length} of {allFilteredShipments.length}</p>
                    </div>
                    <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
                        <NavBtn active={view === 'grid'} onClick={() => setView('grid')} icon={List} />
                        <NavBtn active={view === 'tile'} onClick={() => setView('tile')} icon={LayoutGrid} />
                    </div>
                </div>

                <ShipmentToolbar 
                    onSearch={setSearchTerm} 
                    onFilterStatus={setStatusFilter} 
                    onSort={(t) => setSortConfig(sortConfig === t ? null : t)} 
                    currentStatus={statusFilter} 
                    onAddClick={() => setIsAddModalOpen(true)} 
                />

                <div className="mt-6">
                    {paginatedShipments.length === 0 ? (
                        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-bold">No results found.</div>
                    ) : view === 'grid' ? (
                        <div className="overflow-x-auto"><ShipmentGrid data={paginatedShipments} onUpdateStatus={(id, status) => updateStatus({ variables: { id, status } })} onEditClick={setEditingShipment} /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {paginatedShipments.map(s => (
                            <ShipmentTile key={s.id} ship={s} onClick={setSelectedShip} onEditClick={setEditingShipment} onUpdateStatus={(id, status) => updateStatus({ variables: { id, status } })} />
                        ))}
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-10">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20"><ChevronLeft size={20} className="dark:text-white" /></button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 md:w-10 md:h-10 rounded-lg font-bold text-xs md:text-sm transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800'}`}>{i + 1}</button>
                            ))}
                        </div>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20"><ChevronRight size={20} className="dark:text-white" /></button>
                    </div>
                )}
            </main>

            <ShipmentDetail ship={selectedShip} onClose={() => setSelectedShip(null)} />
            {(isAddModalOpen || editingShipment) && (
                <ShipmentForm initialData={editingShipment} onClose={() => { setIsAddModalOpen(false); setEditingShipment(null); }} onSubmit={(f) => editingShipment ? updateShipment({ variables: { id: editingShipment.id, ...f } }) : addShipment({ variables: f })} />
            )}
        </div>
    );
}

export default App;