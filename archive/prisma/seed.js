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
    const [results, _] = await connection.query('SELECT * FROM interest_rates');

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
      await prisma.interest_rates.deleteMany();
      console.log('Deleted records in interest_rates table');
  
      // Fetch data from the MySQL database
      const dataToSeed = await fetchYourDataFromMySQL();
      console.log('Data to seed:', dataToSeed);
  
      // Split the data into chunks for efficient batch insertion
      const chunkSize = 100; // You can adjust this based on your needs
      const chunks = [];

      for (let i = 0; i < dataToSeed.length; i += chunkSize) {
        chunks.push(dataToSeed.slice(i, i + chunkSize));
      }

      // Insert data into the PlanetScale database using createMany
      for (const chunk of chunks) {
        await prisma.interest_rates.createMany({
          data: chunk,
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
