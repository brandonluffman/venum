const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise'); // Import the mysql2 library

const prisma = new PrismaClient();

const fetchYourDataFromMySQL = async () => {
  try {
    // Create a MySQL connection
    const connection = await mysql.createConnection({
        host: 'localhost', // Replace with your MySQL host
        user: 'root', // Replace with your MySQL user
        password: 'password123', // Replace with your MySQL password
        database: 'stocksofficial', // Replace with your MySQL database name
      });

    // Custom query to fetch data from your existing MySQL database
    const [results, _] = await connection.query('SELECT * FROM company_info');

    // Close the MySQL connection
    await connection.end();
    console.log('Fetched data from MySQL:', results);

    // Return the fetched data
    return results;
  } catch (e) {
    console.error('Error fetching data from MySQL:', e);
    throw e;
  }
};
const load = async () => {
    try {
      // Delete existing records in the company_info table
      await prisma.company_info.deleteMany();
      console.log('Deleted records in company_info table');
  
      // Fetch data from the MySQL database
      const dataToSeed = await fetchYourDataFromMySQL();
      console.log('Data to seed:', dataToSeed);
  
      // Insert data into the PlanetScale database one by one
      for (const record of dataToSeed) {
        await prisma.company_info.create({
          data: record,
        });
      }
  
      console.log('Data seeded successfully.');
    } catch (e) {
      console.error('Error seeding data:', e);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  load();
