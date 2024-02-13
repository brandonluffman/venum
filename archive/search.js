import prisma from '../../lib/prisma'; // Import the Prisma client instance

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Only handle GET requests
  }

  const { q } = req.query; // Get the search query parameter
  console.log(`q: ${q}`);

  if (!q) {
    return res.status(400).json({ error: 'Search query is missing.' });
  }

  try {
    // Perform the autosuggest search using Prisma
    const results = await prisma.company_info.findMany({
      where: {
        OR: [
          { Ticker: { startsWith: q.toUpperCase() } },
          { Title: { startsWith: q.toUpperCase() } },
        ],
      },
      select: {
        id: true,
        CIK: true,
        Ticker: true,
        Title: true,
        Short_Name: false,
        Long_Name: false,
        Industry: false,
        Sector: false,
        Country: true,
        Market_Cap: false,
        Exchange: true,
        Summary: false,
        Phone: false,
        Website: false,
        Employees: false,
        CEO: false,
        Full_Address: false,
      },
      take: 5
    });

    // Convert bigint values to strings and handle null values
    const serializedResults = results.map((result) => ({
      ...result,
      Market_Cap: result.Market_Cap !== undefined ? result.Market_Cap.toString() : null,
      // Add similar checks for other properties if needed
    }));

    return res.status(200).json(serializedResults);
  } catch (error) {
    console.error('Error performing search:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}



