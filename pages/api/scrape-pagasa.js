import axios from 'axios';
import cheerio from 'cheerio';

const PAGASA_URL = 'https://www.pagasa.dost.gov.ph/'; // Update URL if necessary

export default async function handler(req, res) {
  try {
    const response = await axios.get(PAGASA_URL);
    const html = response.data;
    const $ = cheerio.load(html);

    // Adjust the selector to target the specific data
    const typhoonAlerts = [];
    const seenTitles = new Set(); // To keep track of unique titles

    $('.cyclone-warning-item').each((index, element) => {
      const title = $(element).find('.cyclone-warning-title').text().trim();
      const description = $(element).find('.cyclone-warning-description').text().trim();

      // Remove "See More" text if present
      const cleanedDescription = description.replace('See More', '').trim();

      // Add a period at the end if not already present
      const descriptionWithPeriod = cleanedDescription.endsWith('.') 
        ? cleanedDescription 
        : `${cleanedDescription}.`;

      // Append "Stay Safe" at the end
      const finalDescription = `${descriptionWithPeriod} Stay Safe!`;

      // Add to the set if not already present
      if (!seenTitles.has(title)) {
        seenTitles.add(title);
        typhoonAlerts.push({ title, description: finalDescription });
      }
    });

    res.status(200).json(typhoonAlerts);
  } catch (error) {
    console.error('Error scraping PAGASA:', error);
    res.status(500).json({ error: 'Failed to fetch typhoon data' });
  }
}
