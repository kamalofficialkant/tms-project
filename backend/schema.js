export const typeDefs = `#graphql
  type Shipment {
    id: ID!
    shipperName: String!
    carrierName: String!
    pickupLocation: String!
    deliveryLocation: String!
    status: String!
    trackingNo: String!
    rate: Float!
    serviceType: String
    estimatedDelivery: String
    weight: String
    priority: String
  }

  input ShipmentFilter {
    status: String
    shipperName: String
  }

  type Query {
    shipments(limit: Int, offset: Int, filter: ShipmentFilter, sortBy: String): [Shipment]
    shipment(id: ID!): Shipment
  }

  type Mutation {
    addShipment(
      shipperName: String!, 
      carrierName: String!, 
      pickupLocation: String!, 
      deliveryLocation: String!, 
      rate: Float!,
      serviceType: String,
      weight: String
    ): Shipment

    updateShipment(
      id: ID!, 
      shipperName: String, 
      carrierName: String, 
      pickupLocation: String,
      deliveryLocation: String,
      rate: Float, 
      serviceType: String, 
      weight: String
    ): Shipment

    updateShipmentStatus(id: ID!, status: String!): Shipment
  }
`;