import { supabase } from '../../utils/supabaseClient'


export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Only handle GET requests.
    }
  
    const { q } = req.query; // Get the search query parameter.
    console.log(`q: ${q}`);
  
    if (!q) {
      return res.status(400).json({ error: 'Search query is missing.' });
    }
  
    try {
      // Perform the autosuggest search using Supabase
      let { data: results, error } = await supabase
          .from('company_info')
          .select('id, cik, ticker, title, country, exchange')
          .ilike('title', `${q}%`) // For ticker symbol, partial match.
          .limit(5);
  
      if (error) throw error;
  
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error performing search:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
