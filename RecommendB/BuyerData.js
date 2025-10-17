const { MongoClient } = require("mongodb");
import dotenv from 'dotenv';


//Replace with our mongodb connection string
const uri = process.env.MongoURI;
const client = new MongoClient(uri);
if (!uri) {
  throw new Error("The ATLAS_URI environment variable must be defined");
}

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("agriConnect");
//         const buyers = database.collection("buyers");
//         const farmers = database.collection("farmers");
//         const transactions = database.collection("transactions");

//         //Creating 10 sample buyers entries
//         const sampleBuyers = [
//             {
//                 "buyerId": "BUYER-201",
//                 "companyName": "FreshMart Logistics",
//                 "buyerType": "Wholesaler",
//                 "latitude": "18.5204",
//                 "longitude": "73.8567",
//                 "city": "Pune",
//                 "isVerified": true,
//                 "productRequirements": "Tomato",
//             },
//             {
//                 "buyerId": "BUYER-202",
//                 "companyName": "AgroPure Traders",
//                 "buyerType": "Exporter",
//                 "latitude": "20.0112",
//                 "longitude": "73.7909",
//                 "city": "Nashik",
//                 "isVerified": true,
//                 "productRequirements": "Onion",
//             },
//             {
//                 "buyerId": "BUYER-203",
//                 "companyName": "Satara Organics",
//                 "buyerType": "Retailer",
//                 "latitude": "17.6805",
//                 "longitude": "74.0183",
//                 "city": "Satara",
//                 "isVerified": false,
//                 "productRequirements": "Potato",
//             },
//             {
//                 "buyerId": "BUYER-204",
//                 "companyName": "GreenLeaf Supply Co",
//                 "buyerType": "Wholesaler",
//                 "latitude": "18.5612",
//                 "longitude": "73.9215",
//                 "city": "Pune",
//                 "isVerified": true,
//                 "productRequirements": "Onion",
//             },
//             {
//                 "buyerId": "BUYER-205",
//                 "companyName": "Mumbai Veggies Inc.",
//                 "buyerType": "Exporter",
//                 "latitude": "19.0760",
//                 "longitude": "72.8777",
//                 "city": "Mumbai",
//                 "isVerified": true,
//                 "productRequirements": "Tomato",
//             },
//             {
//                 "buyerId": "BUYER-206",
//                 "companyName": "Local Harvest Retail",
//                 "buyerType": "Retailer",
//                 "latitude": "18.4597",
//                 "longitude": "73.8512",
//                 "city": "Pune",
//                 "isVerified": true,
//                 "productRequirements": "Onion",
//             },
//             {
//                 "buyerId": "BUYER-207",
//                 "companyName": "Nashik Grapevine Exporters",
//                 "buyerType": "Exporter",
//                 "latitude": "19.9975",
//                 "longitude": "73.7898",
//                 "city": "Nashik",

//                 "isVerified": true,
//                 "productRequirements": "Grapes",
//             },
//             {
//                 "buyerId": "BUYER-208",
//                 "companyName": "Quick Farm Buys",
//                 "buyerType": "Wholesaler",
//                 "latitude": "19.0941",
//                 "longitude": "74.7452",
//                 "city": "Ahmednagar",
//                 "isVerified": false,
//                 "productRequirements": "Tomato",
//             }
//         ];
//         //Creating 10 sample farmers entries
//         const sampleFarmers = [
// {
//     "farmerId": "FARMER-101",
//     "farmerName": "Anil Kadam",
//     "city": "Pune",
//     "latitude": "18.5204",
//     "longitude": "73.8567"
// },
// {
//     "farmerId": "FARMER-102",
//     "farmerName": "Sunita Pawar",
//     "city": "Nashik",
//     "latitude": "20.0112",
//     "longitude": "73.7909"
// },
// {
//     "farmerId": "FARMER-103",
//     "farmerName": "Ramesh Jadhav",
//     "city": "Satara",
//     "latitude": "17.6805",
//     "longitude": "74.0183"
// },
// {
//     "farmerId": "FARMER-104",
//     "farmerName": "Vijay Shinde",
//     "city": "Ahmednagar",
//     "latitude": "19.0941",
//     "longitude": "74.7452"
// },
// {
//     "farmerId": "FARMER-105",
//     "farmerName": "Priya Desai",
//     "city": "Pune",
//     "latitude": "18.4977",
//     "longitude": "73.8744"
// }
//         ];
//         //Creating 10 sample transaction entries of buyers
//         const sampleTransactions = [
// {
//     transactionId: "TXN-001",
//     farmerId: "FARMER-101",
//     buyerId: "BUYER-201",
//     productName: "Tomato",
//     quantityKg: 500,
//     ratingGivenToBuyer: 5,
//     transactionDate: "2025-08-01",
// },
// {
//     transactionId: "TXN-002",
//     farmerId: "FARMER-102",
//     buyerId: "BUYER-202",
//     productName: "Onion",
//     quantityKg: 1200,
//     ratingGivenToBuyer: 5,
//     transactionDate: "2025-08-02",
// },
// {
//     transactionId: "TXN-003",
//     farmerId: "FARMER-103",
//     buyerId: "BUYER-203",
//     productName: "Potato",
//     quantityKg: 800,
//     ratingGivenToBuyer: 3,
//     transactionDate: "2025-08-03",
// },
// {
//     transactionId: "TXN-004",
//     farmerId: "FARMER-101",
//     buyerId: "BUYER-204",
//     productName: "Onion",
//     quantityKg: 300,
//     ratingGivenToBuyer: 4,
//     transactionDate: "2025-08-04",
// },
// {
//     transactionId: "TXN-005",
//     farmerId: "FARMER-105",
//     buyerId: "BUYER-201",
//     productName: "Tomato",
//     quantityKg: 650,
//     ratingGivenToBuyer: 4,
//     transactionDate: "2025-08-05",
// },
// {
//     transactionId: "TXN-006",
//     farmerId: "FARMER-102",
//     buyerId: "BUYER-205",
//     productName: "Onion",
//     quantityKg: 2000,
//     ratingGivenToBuyer: 2,
//     transactionDate: "2025-08-06",
// },
// {
//     transactionId: "TXN-007",
//     farmerId: "FARMER-104",
//     buyerId: "BUYER-201",
//     productName: "Tomato",
//     quantityKg: 450,
//     ratingGivenToBuyer: 5,
//     transactionDate: "2025-08-07",
// },
// {
//     transactionId: "TXN-008",
//     farmerId: "FARMER-101",
//     buyerId: "BUYER-206",
//     productName: "Onion",
//     quantityKg: 250,
//     ratingGivenToBuyer: 5,
//     transactionDate: "2025-08-08",
// },
// {
//     transactionId: "TXN-009",
//     farmerId: "FARMER-102",
//     buyerId: "BUYER-202",
//     productName: "Onion",
//     quantityKg: 1500,
//     ratingGivenToBuyer: 4,
//     transactionDate: "2025-08-09",
// },
// {
//     transactionId: "TXN-010",
//     farmerId: "FARMER-105",
//     buyerId: "BUYER-204",
//     productName: "Onion",
//     quantityKg: 700,
//     ratingGivenToBuyer: 4,
//     transactionDate: "2025-08-10",
// },
// {
//     transactionId: "TXN-011",
//     farmerId: "FARMER-101",
//     buyerId: "BUYER-201",
//     productName: "Tomato",
//     quantityKg: 550,
//     ratingGivenToBuyer: 5,
//     transactionDate: "2025-08-11",
// },
// {
//     transactionId: "TXN-012",
//     farmerId: "FARMER-104",
//     buyerId: "BUYER-208",
//     productName: "Tomato",
//     quantityKg: 1000,
//     ratingGivenToBuyer: 3,
//     transactionDate: "2025-08-12",
// },


//         ];

//         //Insert the documents into the collection

//         const result = await transactions.insertMany(sampleBuyers);
//         console.log(`${result.insertedCount} documents were inserted`);

//     }
//     finally {
//         await client.close();
//     }
// }

async function run() {
    try {
        await client.connect();
        const database = client.db("agriConnect");
        const buyers = database.collection("buyers");
        const farmers = database.collection("farmers");
        const transactions = database.collection("transactions");

        // --- Data with Correct GeoJSON format ---
        const sampleBuyers = [
            {
                "buyerId": "BUYER-201",
                "companyName": "FreshMart Logistics",
                "buyerType": "Wholesaler",
                "city": "Pune",
                "isVerified": true,
                "productRequirements": "Tomato",
                "location": {
                    "type": "Point",
                    "coordinates": [18.5204, 73.8567]
                },
            },
            {
                "buyerId": "BUYER-202",
                "companyName": "AgroPure Traders",
                "buyerType": "Exporter",
                "city": "Nashik",
                "isVerified": true,
                "productRequirements": "Onion",
                "location": {
                    "type": "Point",
                    "coordinates": [20.0112, 73.7909]
                },
            },
            {
                "buyerId": "BUYER-203",
                "companyName": "Satara Organics",
                "buyerType": "Retailer",
                "city": "Satara",
                "isVerified": false,
                "productRequirements": "Potato",
                "location": {
                    "type": "Point",
                    "coordinates": [17.6805, 74.0183]
                },
            },
            {
                "buyerId": "BUYER-204",
                "companyName": "GreenLeaf Supply Co",
                "buyerType": "Wholesaler",
                "city": "Pune",
                "isVerified": true,
                "productRequirements": "Onion",
                "location": {
                    "type": "Point",
                    "coordinates": [18.5612, 73.9215]
                },
            },
            {
                "buyerId": "BUYER-205",
                "companyName": "Mumbai Veggies Inc.",
                "buyerType": "Exporter",
                "city": "Mumbai",
                "isVerified": true,
                "productRequirements": "Tomato",
                "location": {
                    "type": "Point",
                    "coordinates": [19.0760, 72.8777]
                },
            },
            {
                "buyerId": "BUYER-206",
                "companyName": "Local Harvest Retail",
                "buyerType": "Retailer",
                "city": "Pune",
                "isVerified": true,
                "productRequirements": "Onion",
                "location": {
                    "type": "Point",
                    "coordinates": [18.4597, 73.8512]
                },
            },
            {
                "buyerId": "BUYER-207",
                "companyName": "Nashik Grapevine Exporters",
                "buyerType": "Exporter",
                "city": "Nashik",
                "isVerified": true,
                "productRequirements": "Grapes",
                "location": {
                    "type": "Point",
                    "coordinates": [19.9975, 73.7898]
                },
            },
            {
                "buyerId": "BUYER-208",
                "companyName": "Quick Farm Buys",
                "buyerType": "Wholesaler",
                "city": "Ahmednagar",
                "isVerified": false,
                "productRequirements": "Tomato",
                "location": {
                    "type": "Point",
                    "coordinates": [19.0941, 74.745]
                },
            }
            // ... (add the rest of your buyers with the new location format)
        ];

        const sampleFarmers = [
            {
                "farmerId": "FARMER-101",
                "farmerName": "Anil Kadam",
                "city": "Pune",
                "location": {
                    "type": "Point",
                    "coordinates": [18.5204,73.8567]
                },
            },
            {
                "farmerId": "FARMER-102",
                "farmerName": "Sunita Pawar",
                "city": "Nashik",
                "location": {
                    "type": "Point",
                    "coordinates": [20.0112,73.7909]
                },
            },
            {
                "farmerId": "FARMER-103",
                "farmerName": "Ramesh Jadhav",
                "city": "Satara",
                "location": {
                    "type": "Point",
                    "coordinates": [17.6805,74.0183]
                },
            },
            {
                "farmerId": "FARMER-104",
                "farmerName": "Vijay Shinde",
                "city": "Ahmednagar",
                "location": {
                    "type": "Point",
                    "coordinates": [19.0941,74.7452]
                },
            },
            {
                "farmerId": "FARMER-105",
                "farmerName": "Priya Desai",
                "city": "Pune",
                "location": {
                    "type": "Point",
                    "coordinates": [18.4977,73.8744]
                },
            }
            // ... (add the rest of your farmers with the new location format)
        ];

        const sampleTransactions = [
            {
                transactionId: "TXN-001",
                farmerId: "FARMER-101",
                buyerId: "BUYER-201",
                productName: "Tomato",
                quantityKg: 500,
                ratingGivenToBuyer: 5,
                transactionDate: "2025-08-01",
            },
            {
                transactionId: "TXN-002",
                farmerId: "FARMER-102",
                buyerId: "BUYER-202",
                productName: "Onion",
                quantityKg: 1200,
                ratingGivenToBuyer: 5,
                transactionDate: "2025-08-02",
            },
            {
                transactionId: "TXN-003",
                farmerId: "FARMER-103",
                buyerId: "BUYER-203",
                productName: "Potato",
                quantityKg: 800,
                ratingGivenToBuyer: 3,
                transactionDate: "2025-08-03",
            },
            {
                transactionId: "TXN-004",
                farmerId: "FARMER-101",
                buyerId: "BUYER-204",
                productName: "Onion",
                quantityKg: 300,
                ratingGivenToBuyer: 4,
                transactionDate: "2025-08-04",
            },
            {
                transactionId: "TXN-005",
                farmerId: "FARMER-105",
                buyerId: "BUYER-201",
                productName: "Tomato",
                quantityKg: 650,
                ratingGivenToBuyer: 4,
                transactionDate: "2025-08-05",
            },
            {
                transactionId: "TXN-006",
                farmerId: "FARMER-102",
                buyerId: "BUYER-205",
                productName: "Onion",
                quantityKg: 2000,
                ratingGivenToBuyer: 2,
                transactionDate: "2025-08-06",
            },
            {
                transactionId: "TXN-007",
                farmerId: "FARMER-104",
                buyerId: "BUYER-201",
                productName: "Tomato",
                quantityKg: 450,
                ratingGivenToBuyer: 5,
                transactionDate: "2025-08-07",
            },
            {
                transactionId: "TXN-008",
                farmerId: "FARMER-101",
                buyerId: "BUYER-206",
                productName: "Onion",
                quantityKg: 250,
                ratingGivenToBuyer: 5,
                transactionDate: "2025-08-08",
            },
            {
                transactionId: "TXN-009",
                farmerId: "FARMER-102",
                buyerId: "BUYER-202",
                productName: "Onion",
                quantityKg: 1500,
                ratingGivenToBuyer: 4,
                transactionDate: "2025-08-09",
            },
            {
                transactionId: "TXN-010",
                farmerId: "FARMER-105",
                buyerId: "BUYER-204",
                productName: "Onion",
                quantityKg: 700,
                ratingGivenToBuyer: 4,
                transactionDate: "2025-08-10",
            },
            {
                transactionId: "TXN-011",
                farmerId: "FARMER-101",
                buyerId: "BUYER-201",
                productName: "Tomato",
                quantityKg: 550,
                ratingGivenToBuyer: 5,
                transactionDate: "2025-08-11",
            },
            {
                transactionId: "TXN-012",
                farmerId: "FARMER-104",
                buyerId: "BUYER-208",
                productName: "Tomato",
                quantityKg: 1000,
                ratingGivenToBuyer: 3,
                transactionDate: "2025-08-12",
            },
            // ... (add the rest of your transactions)
        ];

        // --- Clear existing data to prevent duplicates when re-running ---
        await buyers.deleteMany({});
        await farmers.deleteMany({});
        await transactions.deleteMany({});
        console.log("Cleared existing collections.");

        // --- Insert each dataset into its correct collection ---
        const buyersResult = await buyers.insertMany(sampleBuyers);
        console.log(`${buyersResult.insertedCount} documents were inserted into the buyers collection.`);

        const farmersResult = await farmers.insertMany(sampleFarmers);
        console.log(`${farmersResult.insertedCount} documents were inserted into the farmers collection.`);

        const transactionsResult = await transactions.insertMany(sampleTransactions);
        console.log(`${transactionsResult.insertedCount} documents were inserted into the transactions collection.`);

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
