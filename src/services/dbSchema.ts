/**
 * MongoDB Mongoose Schema Architecture Specification
 * Prepared for future enterprise production backend integration:
 * Express.js + Mongoose / MongoDB Atlas
 */

export const MONGODB_ARCHITECTURE_DOCS = {
  databaseName: 'greenlink_agridb',
  collections: [
    {
      collectionName: 'users',
      description: 'Stores farmers, buyers, FPOs, and administrative users with RBAC tokens',
      schemaFields: {
        _id: 'ObjectId',
        name: 'String (required, trim)',
        email: 'String (unique, indexed, lowercase)',
        passwordHash: 'String (bcrypt salted)',
        role: "String (enum: ['farmer', 'buyer', 'fpo_admin', 'super_admin'])",
        state: 'String (indexed)',
        district: 'String (indexed)',
        preferredLanguage: "String (default: 'hi')",
        phone: 'String (validated 10-digit Indian MSISDN)',
        farmDetails: {
          landAreaAcres: 'Number',
          soilType: 'String',
          irrigationSource: 'String',
          kisanCreditCardNo: 'String (encrypted)',
        },
        businessDetails: {
          companyName: 'String',
          gstin: 'String',
          mandiLicenseNo: 'String',
        },
        createdAt: 'Date (default: Date.now)',
        updatedAt: 'Date',
      },
      indexes: [
        { email: 1 },
        { phone: 1 },
        { role: 1, state: 1, district: 1 },
      ],
    },
    {
      collectionName: 'crop_listings',
      description: 'Farmer harvest listings available for market discovery and trade negotiation',
      schemaFields: {
        _id: 'ObjectId',
        farmer: 'ObjectId (ref: User, required, indexed)',
        cropName: 'String (required, indexed)',
        variety: 'String',
        category: "String (enum: ['Grains & Cereals', 'Pulses & Legumes', 'Vegetables', 'Oilseeds', 'Spices', 'Commercial Crops'])",
        quantityKg: 'Number (required, min: 10)',
        expectedPricePerKg: 'Number (required, min: 1)',
        harvestDate: 'Date',
        qualityGrade: "String (enum: ['Grade A (Premium)', 'Grade B (Standard)', 'Organic Certified'])",
        storageType: "String (enum: ['Farm Shed', 'Cold Storage', 'Warehouse', 'Open Field'])",
        location: {
          type: "String (default: 'Point')",
          coordinates: '[Number] (GeoJSON: [longitude, latitude])',
          district: 'String',
          state: 'String',
        },
        images: ['String (S3 / Cloud Storage CDN URLs)'],
        status: "String (enum: ['Active', 'Under Negotiation', 'Sold', 'Pending Review'], default: 'Active')",
        isApproved: 'Boolean (default: true)',
        createdAt: 'Date (default: Date.now)',
      },
      indexes: [
        { cropName: 'text', description: 'text', variety: 'text' },
        { 'location.state': 1, 'location.district': 1 },
        { category: 1, expectedPricePerKg: 1 },
        { farmer: 1, status: 1 },
      ],
    },
    {
      collectionName: 'buyer_enquiries',
      description: 'Direct procurement enquiries and negotiations between buyers and farmers',
      schemaFields: {
        _id: 'ObjectId',
        cropListing: 'ObjectId (ref: CropListing, required, indexed)',
        farmer: 'ObjectId (ref: User, required, indexed)',
        buyer: 'ObjectId (ref: User, required, indexed)',
        requestedQuantityKg: 'Number (required)',
        offeredPricePerKg: 'Number (required)',
        message: 'String',
        status: "String (enum: ['Pending', 'Accepted', 'Declined', 'In Discussion'], default: 'Pending')",
        chatThread: [
          {
            sender: 'ObjectId (ref: User)',
            text: 'String',
            sentAt: 'Date (default: Date.now)',
          },
        ],
        createdAt: 'Date (default: Date.now)',
        updatedAt: 'Date',
      },
      indexes: [
        { farmer: 1, status: 1 },
        { buyer: 1, status: 1 },
      ],
    },
    {
      collectionName: 'mandi_prices',
      description: 'Daily Agmarknet APMC mandi prices and central MSP benchmarks',
      schemaFields: {
        _id: 'ObjectId',
        crop: 'String (indexed)',
        variety: 'String',
        mandi: 'String',
        district: 'String',
        state: 'String (indexed)',
        minPrice: 'Number',
        maxPrice: 'Number',
        modalPrice: 'Number',
        msp: 'Number',
        observationDate: 'Date (indexed)',
      },
      indexes: [
        { crop: 1, state: 1, observationDate: -1 },
      ],
    },
  ],
};
