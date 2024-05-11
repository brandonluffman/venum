import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Only handle GET requests.
    }

        console.log('REQ', req.body.indexes)
    const ids = req.body.indexes; // Get the list of IDs from query parameters.
    console.log(`IDs: ${ids}`);

    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: 'Invalid or missing IDs.' });
    }

    try {
        // Perform the search using Supabase
        let { data: results, error } = await supabase
            .from('company_info')
            .select('id, cik, ticker, title, country, exchange, summary')
            .in('id', ids);

        if (error) throw error;

        return res.status(200).json(results);
    } catch (error) {
        console.error('Error performing search:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}