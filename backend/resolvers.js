import { shipments } from './data.js';

export const resolvers = {
  Query: {
    shipments: (_, { limit, offset, filter, sortBy }) => {
      let result = [...shipments];

      if (filter) {
        if (filter.status && filter.status !== 'All') {
          result = result.filter(s => s.status === filter.status);
        }
        if (filter.shipperName) {
          result = result.filter(s => 
            s.shipperName.toLowerCase().includes(filter.shipperName.toLowerCase())
          );
        }
      }

      if (sortBy) {
        if (sortBy === 'rate') result.sort((a, b) => b.rate - a.rate);
        if (sortBy === 'shipper') result.sort((a, b) => a.shipperName.localeCompare(b.shipperName));
      }

      if (limit) {
        return result.slice(offset || 0, (offset || 0) + limit);
      }
      return result;
    },
    shipment: (_, { id }) => shipments.find(s => s.id === id),
  },

  Mutation: {
    addShipment: (_, args) => {
      const { 
        shipperName, 
        carrierName, 
        pickupLocation, 
        deliveryLocation, 
        rate, 
        serviceType, 
        weight 
      } = args;

      const newShipment = {
        id: `TMS-${Math.floor(1000 + Math.random() * 9000)}`,
        shipperName,
        carrierName,
        pickupLocation,
        deliveryLocation,
        rate,
        serviceType: serviceType || "LTL",
        weight: weight || "0 lbs",
        status: "Pending",
        trackingNo: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        priority: "Standard",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      shipments.push(newShipment);
      return newShipment;
    },

    updateShipment: (_, args) => {
      const { id, ...updates } = args;
      const index = shipments.findIndex(s => s.id === id);
      
      if (index === -1) return null;

      shipments[index] = {
        ...shipments[index],
        ...updates
      };

      return shipments[index];
    },

    updateShipmentStatus: (_, { id, status }) => {
      const shipment = shipments.find(s => s.id === id);
      if (!shipment) return null;
      shipment.status = status;
      return shipment;
    }
  }
};