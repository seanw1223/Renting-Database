// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const landlordRoutes = require('./routes/landlordRoute');
const tenantRoutes = require('./routes/tenantRoute');
const contractRoutes = require('./routes/contractRoute');
const db = require('./config/db');


const app = express();
const port = 3000;

// Cross Origin request - cors
app.use(cors()); 
// Parse JSON bodies
app.use(express.json());


app.use(express.static('public'));

// API routes
app.use('/api/landlords', landlordRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/contracts', contractRoutes);

// General error handling 
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    testDatabaseConnection(); 
    db.query('SELECT DATABASE()').then(([rows]) => console.log("APP DB:", rows)); 
});

// Test database connection
function testDatabaseConnection() {
    db.query('SHOW TABLES;')
        .then(([rows]) => {
            console.log('Connected to Database. Tables:', rows);
        })
        .catch(error => {
            console.error('Failed to connect to the database:', error.message);
        });

        

}

/* 
Database Design and REST API:

Database Structure
   - The database is relational and includes three main tables: Landlords, Tenants, and Contracts.
   - Each table is linked using foreign keys to establish relationships. For example, the Contracts table links landlords and tenants.

   Impact on API
   - Separate API endpoints exist for each entity (Landlords, Tenants, Contracts), supporting all CRUD operations.
   - The database's relational design ensures efficient data retrieval and consistency, making the API easier to maintain.

*/
