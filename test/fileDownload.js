import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use fileURLToPath and import.meta.url to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Downloading files', async () => {
  it('Downloading AH privacy policy', async () => {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto('https://www.ah.nl/privacy');

    // Extract the download URL
    const downloadUrl = await page.evaluate(() => {
      return document.querySelector('[href*="privacybeleid-clean.pdf"]').href;
    });

    // Define the path for the downloads folder
    const downloadsFolderPath = path.resolve(__dirname, 'downloads');

    // Check if the downloads folder exists, create it if not
    if (!fs.existsSync(downloadsFolderPath)) {
      fs.mkdirSync(downloadsFolderPath, { recursive: true });
    }

    // Define the full path for saving the file
    const downloadPath = path.join(downloadsFolderPath, 'privacy_policy.pdf');

    // Use axios to download the file
    const response = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'stream',
    });

    // Create a write stream to save the file
    const writer = fs.createWriteStream(downloadPath);

    // Pipe the response data to the file
    response.data.pipe(writer);

    // Wait for the download to finish
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Close the browser
    await browser.close();
  });
});
