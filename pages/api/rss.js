// pages/api/rss.js

import RSSParser from 'rss-parser';
import { DateTime } from 'luxon';

const rssParser = new RSSParser();

// Function to convert date to EST
const convertToEST = (publishedDate) => {
  const date = DateTime.fromISO(publishedDate, { zone: 'utc' });
  const estDate = date.setZone('America/New_York');
  return estDate.toFormat('yyyy-MM-dd HH:mm:ss');
};

// RSS Feed URLs with company names
const RSS_FEEDS = [
    { url: 'https://feeds.bloomberg.com/markets/news.rss', company: 'Bloomberg Markets' },
    { url: 'https://feeds.bloomberg.com/economics/news.rss', company: 'Bloomberg Economics' },
    { url: 'https://feeds.bloomberg.com/industries/news.rss', company: 'Bloomberg Industries' },
    { url: 'https://feeds.bloomberg.com/business/news.rss', company: 'Bloomberg Business' },
    
    { url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', company: 'Market Watch' },
    { url: 'https://feeds.content.dowjones.io/public/rss/mw_bulletins', company: 'Market Watch' },

    { url: 'https://finance.yahoo.com/news/rssindex', company: 'Yahoo Finance' },
    { url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', company: 'Dow Jones Markets' },
    { url: 'https://www.ft.com/news-feed?format=rss.&page=1', company: 'Financial Times' },
    { url: 'https://seekingalpha.com/market_currents.xml', company: 'Seeking Alpha' }
];

export default async function handler(req, res) {
  const knownEntries = new Set(); // Track known entries
  const newItems = [];

  try {
    // Iterate through all RSS feed URLs
    for (const { url, company } of RSS_FEEDS) {
      try {
        const feed = await rssParser.parseURL(url);
        feed.items.forEach((item) => {
          if (!knownEntries.has(item.guid)) {
            // Convert published date to EST
            const publishedDate = convertToEST(item.isoDate || item.pubDate);

            // Add the item to newItems list
            newItems.push({
              title: item.title,
              link: item.link,
              summary: item.contentSnippet || 'No summary available',
              publishedDate: publishedDate,
              company: company // Include company name
            });

            knownEntries.add(item.guid);
          }
        });
      } catch (feedError) {
        console.error(`Error parsing feed ${url}:`, feedError);
        // Optionally, handle or log errors specific to individual feeds
      }
    }

    // Sort newItems by published date in descending order
    newItems.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    // Respond with the new RSS feed items
    res.status(200).json(newItems);
    // Optionally log newItems for debugging
    // console.log(newItems);
  } catch (error) {
    console.error('Failed to fetch RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
}